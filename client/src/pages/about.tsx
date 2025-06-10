import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen px-4 py-20 md:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="mb-8 text-4xl font-bold">About Me</h1>
        
        <div className="prose prose-lg">
          <p>
            I'm a designer focused on creating intuitive and engaging digital
            experiences. With over 5 years of experience in UI/UX design, I've
            helped companies transform their ideas into successful products.
          </p>
          
          <h2>My Approach</h2>
          <p>
            I believe in user-centered design that solves real problems. Every
            project starts with understanding the user's needs and business goals
            to create solutions that make an impact.
          </p>
          
          <h2>Skills</h2>
          <ul>
            <li>User Interface Design</li>
            <li>User Experience Design</li>
            <li>Design Systems</li>
            <li>Prototyping</li>
            <li>User Research</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
