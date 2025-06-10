import ProjectForm from "@/components/project-form";

export default function NewProject() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">New Project</h1>
      <div className="max-w-2xl">
        <ProjectForm />
      </div>
    </div>
  );
}
