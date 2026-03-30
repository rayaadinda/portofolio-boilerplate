import { MetadataRoute } from "next"
import { urls } from "@/config/urls"

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/api/"],
		},
		sitemap: `${urls.public}/sitemap.xml`,
	}
}
