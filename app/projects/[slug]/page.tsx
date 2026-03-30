import {
	PageContainer,
	PageContent,
	PageDescription,
	PageHeader,
	PageHeading,
} from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/config/site"
import { urls } from "@/config/urls"
import { cn } from "@/lib/utils"
import { ArrowLeftIcon, ArrowUpRightIcon, GithubIcon } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

type Props = {
	params: Promise<{ slug: string }>
}

const baseUrl = urls.public
const creatorName = siteConfig.metadata.creator || "Portfolio Owner"

// Helper function to convert title to slug
function titleToSlug(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "")
}

// Generate static params for all projects
export async function generateStaticParams() {
	return siteConfig.projects.projects.map((project) => ({
		slug: titleToSlug(project.title),
	}))
}

// Generate metadata for each project
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const project = siteConfig.projects.projects.find(
		(p) => titleToSlug(p.title) === slug
	)

	if (!project) {
		return {
			title: "Project Not Found",
		}
	}

	const projectUrl = `${baseUrl}/projects/${slug}`

	return {
		title: project.title,
		description: project.description,
		openGraph: {
			title: `${project.title} - Portfolio Project`,
			description: project.description,
			url: projectUrl,
			type: "website",
			images: project.image ? [{ url: project.image, width: 1200, height: 630, alt: project.title }] : [],
		},
		twitter: {
			card: "summary_large_image",
			title: project.title,
			description: project.description,
			images: project.image ? [project.image] : [],
		},
		alternates: {
			canonical: projectUrl,
		},
	}
}

export default async function ProjectDetailPage({ params }: Props) {
	const { slug } = await params
	const project = siteConfig.projects.projects.find(
		(p) => titleToSlug(p.title) === slug
	)

	if (!project) {
		notFound()
	}

	// Extract tech stack from description (if available)
	const hasTechStack =
		project.description.includes("using") ||
		project.description.includes("built with") ||
		project.description.includes("featuring")

	// Structured data for the project
	const projectSchema = {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name: project.title,
		description: project.description,
		author: {
			"@type": "Person",
			name: creatorName,
			url: baseUrl,
		},
		url: `${baseUrl}/projects/${slug}`,
		...(project.image && { image: project.image }),
		...(project.github && { codeRepository: project.github }),
		...(project.livePreview && { sameAs: project.livePreview }),
	}

	return (
		<PageContainer>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
			/>
			<Link
				href="/projects"
				className={cn(
					buttonVariants({ variant: "ghost", size: "sm" }),
					"w-fit -ml-2"
				)}
			>
				<ArrowLeftIcon />
				Back to Projects
			</Link>

			<PageHeader>
				<PageHeading>{project.title}</PageHeading>
				<PageDescription>{project.description}</PageDescription>
			</PageHeader>

			<PageContent>
				{/* Project Media */}
				<div className="relative w-full rounded-lg overflow-hidden border border-border aspect-video bg-secondary/50">
					{project.video ? (
						<video
							src={project.video}
							autoPlay
							loop
							muted
							playsInline
							controls
							className="size-full object-cover"
						/>
					) : project.image ? (
						<Image
							src={project.image}
							alt={project.title}
							fill
							priority
							sizes="(max-width: 1024px) 100vw, 1024px"
							className="object-cover"
						/>
					) : (
						<div className="size-full flex items-center justify-center text-muted-foreground">
							No preview available
						</div>
					)}
				</div>

				{/* Project Links */}
				<div className="flex items-center gap-4 flex-wrap">
					{project.github && (
						<a
							href={project.github}
							className={cn(
								buttonVariants({
									variant: "default",
									size: "default",
								})
							)}
							target="_blank"
							rel="noopener noreferrer"
						>
							<GithubIcon />
							View Code
							<ArrowUpRightIcon />
						</a>
					)}

					{project.livePreview && (
						<a
							href={project.livePreview}
							className={cn(
								buttonVariants({
									variant: "outline",
									size: "default",
								})
							)}
							target="_blank"
							rel="noopener noreferrer"
						>
							Live Preview
							<ArrowUpRightIcon />
						</a>
					)}
				</div>

				<Separator />

				{/* Project Details */}
				<div className="space-y-6">
					<div>
						<h2 className="text-xl font-semibold mb-3">About This Project</h2>
						<p className="text-muted-foreground leading-relaxed">
							{project.description}
						</p>
					</div>

					{/* Key Features - extracted from description */}
					{hasTechStack && (
						<div>
							<h2 className="text-xl font-semibold mb-3">Key Features</h2>
							<ul className="list-disc list-inside space-y-2 text-muted-foreground">
								<li>Modern and responsive user interface</li>
								<li>Optimized performance and user experience</li>
								<li>Built with industry-standard technologies</li>
								{project.livePreview && <li>Live deployment available</li>}
								{project.github && <li>Open source codebase</li>}
							</ul>
						</div>
					)}

					{/* Project Links Section */}
					<div>
						<h2 className="text-xl font-semibold mb-3">Links & Resources</h2>
						<div className="flex flex-col gap-3">
							{project.github && (
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
								>
									<GithubIcon className="size-4" />
									<span className="group-hover:underline">View on GitHub</span>
									<ArrowUpRightIcon className="size-3 ml-auto" />
								</a>
							)}
							{project.livePreview && (
								<a
									href={project.livePreview}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="size-4"
									>
										<circle cx="12" cy="12" r="10" />
										<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
										<path d="M2 12h20" />
									</svg>
									<span className="group-hover:underline">Visit Live Site</span>
									<ArrowUpRightIcon className="size-3 ml-auto" />
								</a>
							)}
						</div>
					</div>

					{/* Project Type Badge */}
					<div>
						<h2 className="text-xl font-semibold mb-3">Project Type</h2>
						<div className="flex gap-2 flex-wrap">
							{project.livePreview && (
								<Badge variant="secondary">Production Ready</Badge>
							)}
							{project.github && <Badge variant="outline">Open Source</Badge>}
							{project.video && <Badge variant="outline">Video Demo</Badge>}
							{project.image && !project.video && (
								<Badge variant="outline">Screenshots</Badge>
							)}
						</div>
					</div>
				</div>

				<Separator />

				{/* More Projects */}
				<div>
					<h2 className="text-xl font-semibold mb-4">More Projects</h2>
					<Link
						href="/projects"
						className={cn(
							buttonVariants({ variant: "outline" }),
							"w-full sm:w-auto"
						)}
					>
						<ArrowLeftIcon />
						View All Projects
					</Link>
				</div>
			</PageContent>
		</PageContainer>
	)
}
