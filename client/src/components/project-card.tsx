import { motion } from "framer-motion";
import { Link } from "wouter";
import { type Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={project.caseStudyUrl || `/project/${project.id}`}>
        <a className="block group">
          <div className="overflow-hidden rounded-lg aspect-video mb-4">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h3 className="text-xl font-medium mb-2">{project.title}</h3>
          <p className="text-gray-600">{project.description}</p>
        </a>
      </Link>
    </motion.div>
  );
}