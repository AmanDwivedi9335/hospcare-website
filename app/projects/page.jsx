import ProjectList from "@/components/Projects/Projects";

export const metadata = {
        title: "LADWA Projects | Delivered Safety Implementations",
        description:
                "Browse LADWA's flagship safety projects showcasing large-scale installations, turnkey EHS programs, and technology integrations delivered for leading enterprises.",
        alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
        return (
                <div>
                        <ProjectList />
                </div>
        );
}
