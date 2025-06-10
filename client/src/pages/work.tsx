import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import ProjectCard from "@/components/project-card";
import { Link } from "wouter";

console.log("Framer Motion loaded on Work page");

const services = [
  "UI/UX Design",
  "AI-Powered Product Development",
  "Strategic Design Thinking",
  "Digital Innovation"
];

const experiences = [
  {
    role: "Design Executive at Samsung",
    date: "2024-Current"
  },
  {
    role: "Senior Designer at Verizon",
    date: "2022-23"
  },
  {
    role: "CEO at Orisinal",
    date: "2020-Current"
  },
  {
    role: "Digital Designer at LG",
    date: "2014-20"
  }
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

export default function Work() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });
  
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Next-section visibility based transitions with scroll direction detection
  const isTransitioningRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionsRef = useRef<Element[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastScrollYRef = useRef(0);
  const scrollDirectionRef = useRef<'up' | 'down'>('down');
  
  // Setup scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;
      
      // Determine scroll direction with some hysteresis to prevent jitter
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        scrollDirectionRef.current = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollYRef.current = currentScrollY;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Setup Intersection Observer for section visibility detection
  useEffect(() => {
    // Find all sections to observe and store them in order
    const sections = Array.from(document.querySelectorAll('[class*="py-20"], .min-h-screen'));
    sectionsRef.current = sections;
    
    // Create Intersection Observer with 25% threshold
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const visibilityRatio = entry.intersectionRatio;
          const target = entry.target;
          const currentSectionIndex = sectionsRef.current.indexOf(target);
          const scrollDirection = scrollDirectionRef.current;
          
          // Clear any existing timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          
          // Only trigger transition when 25% visible AND scrolling toward the section
          if (visibilityRatio >= 0.25 && !isTransitioningRef.current) {
            
            // Determine if we should transition based on scroll direction
            let shouldTransition = false;
            
            if (scrollDirection === 'down') {
              // Scrolling down: only transition to sections that come after current viewport
              const currentViewportTop = window.scrollY;
              const targetTop = target.getBoundingClientRect().top + currentViewportTop;
              shouldTransition = targetTop > currentViewportTop;
            } else if (scrollDirection === 'up') {
              // Scrolling up: only transition to sections that come before current viewport
              const currentViewportTop = window.scrollY;
              const targetTop = target.getBoundingClientRect().top + currentViewportTop;
              shouldTransition = targetTop < currentViewportTop;
            }
            
            if (shouldTransition) {
              timeoutRef.current = setTimeout(() => {
                if (!isTransitioningRef.current) {
                  isTransitioningRef.current = true;
                  
                  console.log(`Transitioning ${scrollDirection} to section ${currentSectionIndex}`, target);
                  
                  // Enhanced smooth transition with ease-in/ease-out effect
                  const targetTop = target.getBoundingClientRect().top + window.scrollY;
                  
                  // Custom smooth scroll with easing
                  const startY = window.scrollY;
                  const distance = targetTop - startY;
                  const duration = 800; // 800ms for smooth animation
                  let startTime: number | null = null;
                  
                  // Custom ease-in-out function for natural motion
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
                  
                  // Reset transition flag after animation
                  setTimeout(() => {
                    isTransitioningRef.current = false;
                  }, 1000);
                }
              }, 200); // Slightly longer debounce for more stable transitions
            }
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1], // Monitor multiple thresholds including 25%
        rootMargin: '0px'
      }
    );
    
    // Observe all sections
    sectionsRef.current.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });
    
    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // Debug scroll progress and handle section snapping
  useEffect(() => {
    console.log('Work page useScroll hook initialized');
    console.log('Initial scrollYProgress value:', scrollYProgress.get());
    
    const unsubscribe = scrollYProgress.onChange((value) => {
      console.log('Work page scroll progress:', value);
      // Hero animations still use scroll progress for text effects
    });
    
    return () => {
      unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [scrollYProgress]);
  
  // Headline animations (start at 35% scroll)
  const headlineY = useTransform(scrollYProgress, [0.35, 0.65], [0, -120]);
  const headlineOpacity = useTransform(scrollYProgress, [0.35, 0.65], [1, 0]);
  
  // Subhead + CTA animations (start at 45% scroll, staggered after headline)
  const subheadY = useTransform(scrollYProgress, [0.45, 0.75], [0, -120]);
  const subheadOpacity = useTransform(scrollYProgress, [0.45, 0.75], [1, 0]);

  return (
    <div className="bg-white">
      <div ref={heroRef} className="relative px-4 pb-12 md:px-8 lg:px-16 bg-white min-h-screen flex items-end">
        <div className="max-w-4xl w-full">
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
          
          {/* Headline Section - First to animate */}
          <motion.div
            style={{ y: headlineY, opacity: headlineOpacity }}
            className="mb-8"
          >
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-normal leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              onAnimationComplete={() => console.log("Work page animation completed")}
            >
              Business-savvy designer and creative strategist helping transform ideas into market-ready products.
            </motion.h1>
          </motion.div>
          
          {/* Subhead + CTA Section - Second to animate */}
          <motion.div
            style={{ y: subheadY, opacity: subheadOpacity }}
          >
            <motion.p 
              className="text-xl text-gray-600 mb-6 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              Blending UI/UX expertise, AI innovation, and strategic vision to turn ideas into impactful products.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <button 
                onClick={() => {
                  console.log('CTA clicked - targeting work section');
                  // Temporarily disable auto transitions during CTA scroll
                  isTransitioningRef.current = true;
                  
                  // Target the work section by ID
                  const workSection = document.getElementById('work-section');
                  console.log('Work section found:', workSection);
                  if (workSection) {
                    // Enhanced smooth scroll with ease-in/ease-out effect
                    const targetTop = workSection.getBoundingClientRect().top + window.scrollY;
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
                      } else {
                        // Re-enable auto transitions after CTA scroll completes
                        setTimeout(() => {
                          isTransitioningRef.current = false;
                        }, 500);
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
      </div>

      <div id="work-section" className="px-4 md:px-8 lg:px-16 py-20 min-h-screen bg-gray-50">
        {/* Work Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="text-2xl font-bold mb-12">Work</h2>
          
          {/* Featured Case Studies Section */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-6">Featured Case Studies</h3>
            <div className="grid gap-8 md:grid-cols-2">
              {/* Verizon Case Study Card */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/case-studies/verizon">
                  <a className="block group">
                    <div className="overflow-hidden rounded-lg aspect-video mb-4">
                      <img
                        src="https://i.imgur.com/xysIQ9k.jpeg"
                        alt="Verizon 5G Edge Solutions"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Verizon 5G Edge Solutions</h3>
                    <p className="text-gray-600">Redesigning the B2B Ecosystem to Increase Conversions at Verizon</p>
                  </a>
                </Link>
              </motion.div>
              
              {/* LG Case Study Card */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/case-studies/lg">
                  <a className="block group">
                    <div className="overflow-hidden rounded-lg aspect-video mb-4">
                      <img
                        src="https://i.imgur.com/Si55Eet.jpeg"
                        alt="LG National Retail Redesign"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-xl font-medium mb-2">LG National Retail Redesign</h3>
                    <p className="text-gray-600">Modernizing Third-Party Retail Operations to Drive Growth at LG</p>
                  </a>
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Regular Projects Section */}
          <h3 className="text-xl font-semibold mb-6">More Projects</h3>
          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 rounded-lg bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects?.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </motion.div>

      </div>

      {/* Services & Experience Section */}
      <div className="px-4 md:px-8 lg:px-16 py-20 bg-white">
        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
          >
            <h2 className="text-2xl font-bold mb-8">Services</h2>
            {services.map((service, i) => (
              <motion.div
                key={service}
                custom={i}
                variants={itemVariants}
                className="mb-4 text-lg font-semibold"
              >
                {service}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
          >
            <h2 className="text-2xl font-bold mb-8">Experience</h2>
            {experiences.map((experience, i) => (
              <motion.div
                key={experience.role}
                custom={i}
                variants={itemVariants}
                className="mb-4"
              >
                <div className="text-lg font-semibold">{experience.role}</div>
                <div className="text-[#666666] font-light">{experience.date}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="px-4 md:px-8 lg:px-16 py-20 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Email me at</h2>
          <a 
            href="mailto:jaemin.designs@gmail.com"
            className="text-lg hover:text-gray-600 transition-colors"
          >
            jaemin.designs@gmail.com
          </a>
        </motion.div>
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