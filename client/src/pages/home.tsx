import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import ProjectCard from "@/components/project-card";

console.log("Framer Motion loaded successfully");

export default function Home() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects/featured"],
  });
  
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Debug scroll progress
  useEffect(() => {
    console.log('useScroll hook initialized');
    console.log('Initial scrollYProgress value:', scrollYProgress.get());
    
    const unsubscribe = scrollYProgress.onChange((value) => {
      console.log('Scroll progress:', value);
    });
    return unsubscribe;
  }, [scrollYProgress]);
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div className="bg-white">
      <div ref={heroRef} className="relative px-4 pb-4 md:px-8 lg:px-16 bg-white min-h-screen flex items-end">
        <motion.div
          style={{ y, opacity, scale }}
          className="max-w-4xl w-full"
        >
          {/* Hero Thumbnail */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="mb-8"
          >
            <div 
              className="rounded-full overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
              style={{ width: '100px', height: '100px' }}
              onClick={() => setIsLightboxOpen(true)}
            >
              <img 
                src="https://i.imgur.com/y6afQG0.jpeg"
                alt="Portrait thumbnail"
                className="w-full h-full object-cover"
                style={{ 
                  imageRendering: '-webkit-optimize-contrast',
                  backfaceVisibility: 'hidden'
                }}
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            onAnimationComplete={() => console.log("Design animation completed")}
          >
            <h1 className="mb-2 text-7xl sm:text-8xl md:text-9xl font-normal">Design</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <h1 className="mb-8 text-7xl sm:text-8xl md:text-9xl font-normal">Portfolio</h1>
          </motion.div>
          <motion.p 
            className="text-xl text-gray-600 mb-6 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            Creating meaningful digital experiences through thoughtful design and
            attention to detail.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            <button 
              onClick={() => {
                // Target the next section after hero (projects section)
                const nextSection = document.querySelector('div.px-4.md\\:px-8.lg\\:px-16.py-20.min-h-screen.bg-gray-50') || 
                                   document.querySelector('div.bg-gray-50') ||
                                   document.querySelector('[class*="py-20"]:not(.min-h-screen)');
                if (nextSection) {
                  // Enhanced smooth scroll with ease-in/ease-out effect
                  const targetTop = nextSection.getBoundingClientRect().top + window.scrollY;
                  const startY = window.scrollY;
                  const distance = targetTop - startY;
                  const duration = 800;
                  let startTime: number | null = null;
                  
                  const easeInOut = (t: number): number => {
                    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                  };
                  
                  const animateScroll = (currentTime: number) => {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    const easedProgress = easeInOut(progress);
                    const currentY = startY + (distance * easedProgress);
                    
                    window.scrollTo(0, currentY);
                    
                    if (progress < 1) {
                      requestAnimationFrame(animateScroll);
                    }
                  };
                  
                  requestAnimationFrame(animateScroll);
                }
              }}
              className="text-lg hover:text-gray-600 transition-colors cursor-pointer border-none bg-transparent p-0"
            >
              See work →
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="px-4 md:px-8 lg:px-16 py-20 min-h-screen bg-gray-50">
        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-lg bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-2xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src="https://i.imgur.com/y6afQG0.jpeg"
                alt="Portrait"
                className="w-full h-full object-contain rounded-lg"
                style={{ 
                  imageRendering: '-webkit-optimize-contrast',
                  backfaceVisibility: 'hidden'
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
