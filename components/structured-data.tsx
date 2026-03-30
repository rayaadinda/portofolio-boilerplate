import { siteConfig } from "@/config/site"
import { urls } from "@/config/urls"

const baseUrl = urls.public
const profileName = siteConfig.metadata.creator || "Portfolio Owner"
const metadataTitle = siteConfig.metadata.title
const siteTitle =
	typeof metadataTitle === "string"
		? metadataTitle
		: metadataTitle && "default" in metadataTitle
			? metadataTitle.default
			: "Portfolio"

export function StructuredData() {
	const personSchema = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: profileName,
		url: baseUrl,
		image: `${baseUrl}/avatar.jpg`,
		jobTitle: "Full Stack Developer",
		description: siteConfig.metadata.description,
		email: siteConfig.connect.email,
		sameAs: siteConfig.connect.socials.map((social) => social.href),
		knowsAbout: ["Web Development", "Mobile Development", "React", "Next.js", "TypeScript", "Full Stack Development"],
	}

	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteTitle,
		url: baseUrl,
		description: siteConfig.metadata.description,
		author: {
			"@type": "Person",
			name: profileName,
		},
		inLanguage: "en-US",
	}

	const portfolioSchema = {
		"@context": "https://schema.org",
		"@type": "ProfilePage",
		mainEntity: {
			"@type": "Person",
			name: profileName,
			alternateName: profileName,
			description: siteConfig.metadata.description,
			image: `${baseUrl}/avatar.jpg`,
			url: baseUrl,
			sameAs: siteConfig.connect.socials.map((social) => social.href),
			hasOccupation: {
				"@type": "Occupation",
				name: "Full Stack Developer",
				occupationLocation: {
					"@type": "Country",
					name: "Remote",
				},
				skills: "React, Next.js, TypeScript, Node.js, Mobile Development, Web Development",
			},
		},
	}

	const breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: baseUrl,
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Projects",
				item: `${baseUrl}/projects`,
			},
		],
	}

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
			/>
		</>
	)
}
