import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Project } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading } = useQuery<Project>({
    queryKey: [`/api/projects/${id}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 animate-pulse">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="h-96 bg-gray-100 rounded-lg" />
          <div className="h-8 bg-gray-100 w-1/2" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-100" />
            <div className="h-4 bg-gray-100" />
            <div className="h-4 bg-gray-100 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-4 pt-40 pb-20 md:px-8 lg:px-16"
    >
      <div className="max-w-4xl mx-auto">
        <motion.img
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          src={project.image}
          alt={project.title}
          className="w-full h-96 object-cover rounded-lg mb-12"
        />

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold mb-8"
        >
          {project.title}
        </motion.h1>

        <div className="prose prose-lg max-w-none">
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2>Challenge</h2>
            <p>{project.challenge}</p>
          </motion.section>

          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2>Solution</h2>
            <p>{project.solution}</p>
          </motion.section>

          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2>Impact</h2>
            <p>{project.impact}</p>
          </motion.section>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 flex justify-between"
        >
          <Button
            variant="outline"
            asChild
          >
            <Link to={`/project/${parseInt(id) - 1}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Project
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
          >
            <Link to={`/project/${parseInt(id) + 1}`}>
              Next Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}