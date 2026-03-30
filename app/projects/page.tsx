import {
	PageContainer,
	PageContent,
	PageDescription,
	PageHeader,
	PageHeading,
} from "@/components/page-header"
import { siteConfig } from "@/config/site"
import { urls } from "@/config/urls"
import { Metadata } from "next"
import { ProjectItem } from "./project-item"

const projectsUrl = `${urls.public}/projects`

export const metadata: Metadata = {
	title: "Lorem Ipsum",
	description:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	openGraph: {
		title: "Lorem Ipsum - Portfolio",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		url: projectsUrl,
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Lorem Ipsum - Portfolio",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	alternates: {
		canonical: projectsUrl,
	},
}

export default function ProjectsPage() {
	return (
		<PageContainer>
			<PageHeader>
				<PageHeading>Lorem Ipsum</PageHeading>
				<PageDescription>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</PageDescription>
			</PageHeader>
			<PageContent>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{siteConfig.projects.projects.map((project, index) => (
						<ProjectItem key={index} project={project} index={index} />
					))}
				</div>
			</PageContent>
		</PageContainer>
	)
}
