import { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"
import { urls } from "@/config/urls"

// Helper function to convert title to slug
function titleToSlug(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "")
}

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = urls.public

	// Static pages
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `${baseUrl}/projects`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
	]

	// Dynamic project pages
	const projectPages: MetadataRoute.Sitemap = siteConfig.projects.projects.map(
		(project) => ({
			url: `${baseUrl}/projects/${titleToSlug(project.title)}`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.6,
		})
	)

	return [...staticPages, ...projectPages]
}
