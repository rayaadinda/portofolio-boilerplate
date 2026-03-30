"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import * as m from "motion/react-m"
import type { Variants } from "motion/react"
import { X } from "lucide-react"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const bannerVariants: Variants = {
	initial: { opacity: 0, y: -20, filter: "blur(12px)" },
	animate: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: 0.6, ease: "easeOut" },
	},
	exit: {
		opacity: 0,
		y: -20,
		filter: "blur(12px)",
		transition: { duration: 0.3, ease: "easeIn" },
	},
}

const BANNER_STORAGE_KEY = "portfolio-banner-dismissed"

export function Banner() {
	const [isDismissed, setIsDismissed] = useState(true) // Start true to avoid hydration flash
	const [isMounted, setIsMounted] = useState(false)

	const banner = siteConfig.banner

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setIsMounted(true)
		if (banner?.dismissible) {
			const dismissed = localStorage.getItem(BANNER_STORAGE_KEY)
			setIsDismissed(dismissed === "true")
		} else {
			setIsDismissed(false)
		}
	}, [banner?.dismissible])

	if (!banner?.enabled || !isMounted) {
		return null
	}

	if (isDismissed) {
		return null
	}

	const handleDismiss = () => {
		setIsDismissed(true)
		if (banner.dismissible) {
			localStorage.setItem(BANNER_STORAGE_KEY, "true")
		}
	}

	const variantStyles = {
		success:
			"bg-green-500/10 border-green-500/20 text-green-950 dark:text-green-50",
		info: "bg-blue-500/10 border-blue-500/20 text-blue-950 dark:text-blue-50",
		default: "bg-primary/10 border-border text-foreground",
		warning:
			"bg-yellow-500/10 border-yellow-500/20 text-yellow-950 dark:text-yellow-50",
	}

	return (
		<m.div
			variants={bannerVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className={cn(
				"fixed top-0 left-0 right-0 z-[55] border-b backdrop-blur-sm",
				variantStyles[banner.variant || "default"]
			)}
		>
			<div className="container flex items-center justify-between gap-4 py-3 px-4 sm:px-6">
				<div className="flex flex-1 items-center justify-center gap-3 flex-wrap sm:flex-nowrap">
					{/* Message with emoji */}
					<p className="text-sm font-medium text-center sm:text-left">
						{banner.emoji && <span className="mr-2">{banner.emoji}</span>}
						{banner.message}
					</p>

					{/* CTA Button */}
					{banner.ctaLabel && banner.ctaHref && (
						<Link
							href={banner.ctaHref}
							target={banner.ctaHref.startsWith("http") ? "_blank" : undefined}
							rel={
								banner.ctaHref.startsWith("http")
									? "noopener noreferrer"
									: undefined
							}
							className={cn(
								buttonVariants({ size: "sm", variant: "outline" }),
								"h-8 px-3 text-xs font-medium whitespace-nowrap",
								"border-current/20 hover:bg-current/10"
							)}
						>
							{banner.ctaLabel}
						</Link>
					)}
				</div>

				{/* Dismiss Button */}
				{banner.dismissible && (
					<button
						onClick={handleDismiss}
						className={cn(
							"shrink-0 rounded-md p-1.5 transition-colors",
							"hover:bg-current/10 focus-ring"
						)}
						aria-label="Dismiss banner"
						type="button"
					>
						<X className="h-4 w-4" />
					</button>
				)}
			</div>
		</m.div>
	)
}
