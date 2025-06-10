import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import ProjectForm from "@/components/project-form";

export default function EditProject() {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading } = useQuery<Project>({
    queryKey: [`/api/projects/${id}`],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Edit Project</h1>
      <div className="max-w-2xl">
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
