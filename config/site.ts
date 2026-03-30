import { urls } from "@/config/urls"
import { Metadata } from "next"

export type ProjectItem = {
	title: string
	description: string
	video?: string
	image?: string
	github?: string
	livePreview?: string
}

export type ExperienceItem = {
	company: string
	position: string
	duration: string
	description: string
}

export type NavItem = {
	title: string
	href: string
	external?: boolean
}

export type SiteConfig = {
	metadata: Metadata
	banner?: {
		enabled: boolean
		variant: "default" | "success" | "info" | "warning"
		message: string
		emoji?: string
		ctaLabel?: string
		ctaHref?: string
		dismissible?: boolean
	}
	landing: {
		hero: {
			topLine: string
			h1:
				| {
						type: "multi-line"
						content: string[]
				  }
				| {
						type: "single-line"
						content: string
				  }
			description: string
			actions: {
				primary: {
					label: string
					href: string
				}
				secondary: {
					label: string
					href: string
				}
			}
		}
	}
	projects: {
		title: string
		projects: ProjectItem[]
	}
	experience?: {
		title: string
		experiences: ExperienceItem[]
	}
	activities?: {
		title: string
		items: {
			title: string
			description: string
			date: string
			image?: string
			images?: string[]
			link?: string
		}[]
	}
	connect: {
		title: string
		email: string
		socials: {
			label: string
			href: string
		}[]
	}
	header: {
		logoImage: string
		nav: NavItem[]
		button: {
			label: string
			href: string
		}
	}
	footer: {
		copyright: string
	}
}

export const siteConfig: SiteConfig = {
	metadata: {
		title: {
			default:
				"Raya Adinda - Lorem Ipsum Portfolio",
			template: "%s | Raya Adinda",
		},
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		keywords: [
			"Raya Adinda",
			"Lorem Ipsum",
			"Portfolio",
			"Web Developer",
			"React",
			"Next.js",
			"TypeScript",
			"Frontend",
			"Backend",
			"UI",
			"Frontend Developer",
			"Backend Developer",
			"Design",
		],
		authors: [{ name: "Raya Adinda", url: urls.public }],
		creator: "Raya Adinda",
		publisher: "Raya Adinda",
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		alternates: {
			canonical: urls.public,
		},
		metadataBase: new URL(urls.public),
		openGraph: {
			title: "Raya Adinda - Lorem Ipsum Portfolio",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			type: "website",
			locale: "en_US",
			url: urls.public,
			siteName: "Raya Adinda - Lorem Ipsum Portfolio",
			images: [
				{
					url: "/og",
					alt: "Raya Adinda - Lorem Ipsum Portfolio",
					width: 1200,
					height: 630,
				},
				{
					url: "https://via.placeholder.com/1200x630.png?text=Portfolio+Template",
					alt: "rayaadinda OpenGraph Preview",
					width: 1200,
					height: 630,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: "Raya Adinda - Lorem Ipsum Portfolio",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			images: [
				"/og",
				"https://via.placeholder.com/1200x630.png?text=Portfolio+Template",
			],
		},
	},
	banner: {
		enabled: true,
		variant: "success",
		message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		emoji: "🚀",
		ctaLabel: "Lorem ipsum",
		ctaHref: urls.bookCall,
		dismissible: true,
	},
	header: {
		logoImage: "/avatar.jpg",
		nav: [
			{
					title: "Lorem",
				href: "/projects",
			},
			{
					title: "Ipsum",
				href: urls.github,
				external: true,
			},
			{
					title: "Dolor",
				href: urls.linkedin,
				external: true,
			},
		],
		button: {
				label: "Lorem Ipsum",
			href: urls.bookCall,
		},
	},
	landing: {
		hero: {
			topLine: "👋 Raya Adinda - Lorem ipsum dolor sit amet.",
			h1: {
				type: "multi-line",
				content: [
					"Lorem ipsum dolor sit amet.",
					"✦ Consectetur adipiscing elit.",
					"✦ Sed do eiusmod tempor.",
				],
			},
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			actions: {
				primary: {
					label: "Lorem ipsum",
					href: urls.bookCall,
				},
				secondary: {
					label: "Dolor sit amet",
					href: "#activities",
				},
			},
		},
	},
	projects: {
		title: "Projects",
		projects: [
			{
				title: "PulseBoard",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				image:
					"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
				github: "https://github.com/your-username/pulseboard",
				livePreview: "https://pulseboard-demo.vercel.app",
			},
			{
				title: "Relay Studio",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				image:
					"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
				github: "https://github.com/your-username/relay-studio",
				livePreview: "https://relay-studio-demo.vercel.app",
			},
			{
				title: "Northwind Commerce",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				video:
					"https://res.cloudinary.com/demo/video/upload/v1312461204/dog.mp4",
				github: "https://github.com/your-username/northwind-commerce",
				livePreview: "https://northwind-demo.vercel.app",
			},
			{
				title: "Portfolio Planner",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				image:
					"https://via.placeholder.com/1200x800.png?text=Portfolio+Planner",
				github: "https://github.com/your-username/portfolio-planner",
				livePreview: "https://portfolio-planner-demo.vercel.app",
			},
		],
	},
	experience: {
		title: "Lorem Ipsum",
		experiences: [
			{
				company: "Lorem Corp",
				position: "Ipsum Role",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				duration: "2024 - Present",
			},
			{
				company: "Dolor Studio",
				position: "Sit Amet",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				duration: "2022 - 2024",
			},
			{
				company: "Amet Works",
				position: "Consectetur",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				duration: "2020 - 2022",
			},
		],
	},
	activities: {
		title: "Lorem Activity",
		items: [
			{
				title: "Lorem Event",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				date: "2026-02-16",
				images: [
					"https://via.placeholder.com/1280x720.png?text=Meetup+Talk",
					"https://via.placeholder.com/1280x720.png?text=Slides+Preview",
					"https://via.placeholder.com/1280x720.png?text=Q%26A+Session",
				],
				link: "https://github.com/your-username",
			},
			{
				title: "Ipsum Sprint",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				date: "2025-11-01",
				images: [
					"https://via.placeholder.com/1280x720.png?text=PR+Review+Session",
					"https://via.placeholder.com/1280x720.png?text=Maintainer+Collaboration",
					"https://via.placeholder.com/1280x720.png?text=Patch+Release",
					"https://via.placeholder.com/1280x720.png?text=Retrospective",
				],
				link: "https://github.com/your-username",
			},
		],
	},
	connect: {
		title: "Lorem Connect",
		email: "hello@your-portfolio.dev",
		socials: [
			{
				label: "Github",
				href: urls.github,
			},
			{
				label: "Linkedin",
				href: urls.linkedin,
			},
			{
				label: "X",
				href: "https://x.com/your-handle",
			},
			{
				label: "Dribbble",
				href: "https://dribbble.com/your-handle",
			},
		],
	},
	footer: {
		copyright: "© 2026 Raya Adinda",
	},
}
