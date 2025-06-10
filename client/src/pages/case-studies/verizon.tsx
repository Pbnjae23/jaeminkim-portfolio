import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ScreenshotAccordion from "@/components/case-studies/screenshot-accordion";

export default function VerizonCaseStudy() {
  const section2Ref = useRef<HTMLDivElement>(null);
  const imageSecRef = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimatedImage, setHasAnimatedImage] = useState(false);
  const [isAnimatingImage, setIsAnimatingImage] = useState(false);
  const [hasAnimated3, setHasAnimated3] = useState(false);
  const [isAnimating3, setIsAnimating3] = useState(false);
  const lastScrollY = useRef(0);

  // Section 2 animation
  useEffect(() => {
    const section2 = section2Ref.current;
    if (!section2) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Prevent animation if already animating
          if (isAnimating) return;

          const currentScrollY = window.scrollY;
          const scrollingUp = currentScrollY < lastScrollY.current;
          lastScrollY.current = currentScrollY;

          if (entry.isIntersecting && !hasAnimated) {
            // Animate in when scrolling down (first time)
            setIsAnimating(true);
            entry.target.classList.add('animate');
            setHasAnimated(true);
            
            // Reset animating flag after animation completes
            setTimeout(() => {
              setIsAnimating(false);
            }, 600); // Match CSS transition duration
            
          } else if (!entry.isIntersecting && hasAnimated && scrollingUp) {
            // Only animate out when scrolling UP (returning to hero)
            // Don't animate out when scrolling DOWN to section 3
            setIsAnimating(true);
            entry.target.classList.remove('animate');
            setHasAnimated(false);
            
            // Reset animating flag after animation completes
            setTimeout(() => {
              setIsAnimating(false);
            }, 600); // Match CSS transition duration
          }
        });
      },
      {
        threshold: 0.1, // Lower threshold for more stable detection
        rootMargin: '-100px 0px 0px 0px' // Only add margin to top to prevent early exit
      }
    );

    observer.observe(section2);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated, isAnimating]);

  // Image Section animation - exact same logic as section 2
  useEffect(() => {
    const imageSection = imageSecRef.current;
    if (!imageSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Prevent animation if already animating
          if (isAnimatingImage) return;

          const currentScrollY = window.scrollY;
          const scrollingUp = currentScrollY < lastScrollY.current;
          lastScrollY.current = currentScrollY;

          if (entry.isIntersecting && !hasAnimatedImage) {
            // Animate in when scrolling down (first time)
            setIsAnimatingImage(true);
            entry.target.classList.add('animate');
            setHasAnimatedImage(true);
            
            // Reset animating flag after animation completes
            setTimeout(() => {
              setIsAnimatingImage(false);
            }, 600); // Match CSS transition duration
            
          } else if (!entry.isIntersecting && hasAnimatedImage && scrollingUp) {
            // Only animate out when scrolling UP
            setIsAnimatingImage(true);
            entry.target.classList.remove('animate');
            setHasAnimatedImage(false);
            
            // Reset animating flag after animation completes
            setTimeout(() => {
              setIsAnimatingImage(false);
            }, 600); // Match CSS transition duration
          }
        });
      },
      {
        threshold: 0.2, // 20% visibility
        rootMargin: '-100px 0px 0px 0px' // Same margin as other sections
      }
    );

    observer.observe(imageSection);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimatedImage, isAnimatingImage]);

  // Section 3 (Accordion) animation - exact same logic as section 2
  useEffect(() => {
    const section3 = section3Ref.current;
    if (!section3) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Prevent animation if already animating
          if (isAnimating3) return;

          const currentScrollY = window.scrollY;
          const scrollingUp = currentScrollY < lastScrollY.current;
          lastScrollY.current = currentScrollY;

          if (entry.isIntersecting && !hasAnimated3) {
            // Animate in when scrolling down (first time)
            setIsAnimating3(true);
            entry.target.classList.add('animate');
            setHasAnimated3(true);
            
            // Reset animating flag after animation completes
            setTimeout(() => {
              setIsAnimating3(false);
            }, 600); // Match CSS transition duration
            
          } else if (!entry.isIntersecting && hasAnimated3 && scrollingUp) {
            // Only animate out when scrolling UP
            setIsAnimating3(true);
            entry.target.classList.remove('animate');
            setHasAnimated3(false);
            
            // Reset animating flag after animation completes
            setTimeout(() => {
              setIsAnimating3(false);
            }, 600); // Match CSS transition duration
          }
        });
      },
      {
        threshold: 0.2, // 20% visibility as requested
        rootMargin: '-100px 0px 0px 0px' // Same margin as section 2
      }
    );

    observer.observe(section3);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated3, isAnimating3]);

  return (
    <div style={{ backgroundColor: '#F0EDCC' }}>
      {/* Hero Section - Full Viewport with Bottom Anchoring */}
      <div className="relative px-4 md:px-8 lg:px-16 flex items-end" style={{ height: '100vh', backgroundColor: '#F0EDCC' }}>
        <div className="max-w-4xl w-full" style={{ marginBottom: '64px' }}>
          <div>
            {/* Eyebrow heading */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              style={{ marginBottom: '20px' }}
            >
              <h2 
                className="border-b border-[#02343F]" 
                style={{ 
                  color: '#02343F', 
                  fontSize: '1.15em',
                  lineHeight: '1.2',
                  fontWeight: 'normal',
                  paddingBottom: '5px',
                  display: 'inline-block'
                }}
              >
                Verizon 5G Edge Solutions
              </h2>
            </motion.div>
            {/* Main headline */}
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-normal leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            >
              Redesigning the B2B Ecosystem to Increase Conversions at Verizon
            </motion.h1>
          </div>
        </div>
      </div>
      
      {/* Two-column layout section */}
      <div ref={section2Ref} className="section2-wrapper scroll-fade-up px-4 md:px-8 lg:px-16 pt-4 pb-20">
        <div className="w-full">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {/* Left Column */}
            <div className="space-y-6">
              <div 
                className="border-b pb-4"
                style={{ borderColor: '#02343F' }}
              >
                <h2 className="font-bold mb-2" style={{ fontSize: '1.15em', color: '#02343F' }}>5G Edge Solutions Ecosystem</h2>
                <a 
                  href="https://verizon.com/business" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: '#02343F' }}
                >
                  verizon.com/business
                </a>
              </div>
              
              <div 
                className="section2-content border-b pb-4"
                style={{ borderColor: '#02343F' }}
              >
                <h2 className="font-bold mb-2" style={{ fontSize: '1.15em', color: '#02343F' }}>Intro</h2>
                <p style={{ color: '#02343F' }}>
                  Verizon's innovative 5G Edge solutions designed to help businesses scale in the competitive tech industry.
                </p>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <div 
                className="section2-content border-b pb-4"
                style={{ borderColor: '#02343F' }}
              >
                <h2 className="font-bold mb-2" style={{ fontSize: '1.15em', color: '#02343F' }}>Problem</h2>
                <p style={{ color: '#02343F' }}>
                  Verizon's advanced 5G edge solutions offered powerful capabilities for enterprise scaling and optimization, but lacked an effective digital ecosystem to communicate their value proposition and drive adoption among mid-to-large businesses.
                </p>
              </div>
              
              <div 
                className="section2-content border-b pb-4"
                style={{ borderColor: '#02343F' }}
              >
                <h2 className="font-bold mb-2" style={{ fontSize: '1.15em', color: '#02343F' }}>Solution</h2>
                <p style={{ color: '#02343F' }}>
                  I partnered with cross-functional Verizon teams—including stakeholders, CX specialists, researchers, and engineers—to create compelling digital experiences that clearly demonstrate 5G Edge benefits and inspire business transformation through strategic implementation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div ref={imageSecRef} className="py-16 scroll-fade-up" style={{ backgroundColor: "#F0EDCC" }}>
        <div className="px-4 md:px-8 lg:px-16">
          <img 
            src="https://i.imgur.com/xysIQ9k.jpeg" 
            alt="Verizon 5G Edge Solutions Overview"
            className="w-full object-cover rounded-2xl shadow-lg"
            style={{ 
              height: '400px',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}
            loading="lazy"
          />
        </div>
      </div>

      {/* Screenshots Accordion Section */}
      <div ref={section3Ref} className="py-20 scroll-fade-up" style={{ backgroundColor: "#F0EDCC" }}>
        <div className="px-4 md:px-8 lg:px-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h2 className="text-2xl font-bold mb-2 sm:mb-0" style={{ color: '#02343F' }}>What We Built — A Closer Look at the Ecosystem Pages</h2>
            <span className="text-sm mb-2 sm:mb-0" style={{ color: '#02343F' }}>Best viewed in landscape mode</span>
          </div>
          <ScreenshotAccordion />
        </div>
      </div>

    </div>
  );
}