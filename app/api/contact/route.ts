import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"

const contactRecipient = process.env.CONTACT_EMAIL

const ipHits: Map<string, number[]> = new Map()
const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 5

const contactSchema = z.object({
	name: z.string().trim().min(2, "Name too short").max(80, "Name too long"),
	email: z.string().trim().email("Invalid email").max(120, "Email too long"),
	company: z
		.string()
		.trim()
		.max(120, "Company name too long")
		.optional()
		.or(z.literal("")),
	message: z
		.string()
		.trim()
		.min(10, "Message too short")
		.max(2000, "Message too long"),
	website: z.string().optional().or(z.literal("")), // honeypot - must be empty
})

function rateLimit(ip: string) {
	const now = Date.now()
	const hits = ipHits.get(ip) || []
	const recent = hits.filter((t) => now - t < WINDOW_MS)
	if (recent.length >= MAX_HITS) return false
	recent.push(now)
	ipHits.set(ip, recent)
	return true
}

function sanitizeSingleLine(input: string) {
	return input.replace(/[\r\n]+/g, " ").trim()
}

export async function POST(req: Request) {
	try {
		const ip =
			req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
		if (!rateLimit(ip)) {
			return NextResponse.json(
				{ message: "Too many attempts. Try later." },
				{ status: 429 }
			)
		}

		const data = await req.json()

		const parsed = contactSchema.safeParse(data)
		if (!parsed.success) {
			return NextResponse.json(
				{ message: "Invalid submission" },
				{ status: 400 }
			)
		}

		// Honeypot: reject if website field is filled
		if (parsed.data.website && parsed.data.website.trim().length > 0) {
			return NextResponse.json(
				{ message: "Invalid submission" },
				{ status: 400 }
			)
		}

		const { name, email, message, company } = parsed.data
		const safeName = sanitizeSingleLine(name)

		const subject = `New portfolio contact from ${safeName}`
		const body = `Name: ${name}\nEmail: ${email}\nCompany: ${
			company || "-"
		}\nIP: ${ip}\n\nMessage:\n${message}`

		if (process.env.RESEND_API_KEY) {
			if (!contactRecipient) {
				return NextResponse.json(
					{ message: "Missing CONTACT_EMAIL server configuration" },
					{ status: 500 }
				)
			}

			try {
				const resend = new Resend(process.env.RESEND_API_KEY)
				await resend.emails.send({
					from: "Portfolio Contact <onboarding@resend.dev>",
					to: contactRecipient,
					replyTo: email,
					subject,
					text: body,
				})
			} catch {
				return NextResponse.json(
					{ message: "Email send failed" },
					{ status: 502 }
				)
			}
		}

		return NextResponse.json({ message: "Message received. Thank you!" })
	} catch {
		return NextResponse.json(
			{ message: "Failed to process request" },
			{ status: 500 }
		)
	}
}
