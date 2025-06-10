import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxHeroProps {
  /** Optional additional className */
  className?: string;
  /** Image URL for the hero background */
  imageUrl?: string;
  /** Height in pixels (desktop) */
  height?: number;
  /** Parallax intensity factor (1-3) */
  parallaxFactor?: number;
}

/**
 * ParallaxHero - A responsive hero image component with parallax scrolling effect
 * 
 * Features:
 * - Full-width responsive hero image with configurable height
 * - Parallax scrolling effect as user scrolls
 * - Initial fade-in animation
 * - Optimized for performance across devices
 * - Cross-browser compatible
 */
export function ParallaxHero({
  className = "",
  imageUrl = "https://i.imgur.com/xysIQ9k.jpg",
  height = 350,
  parallaxFactor = 2,
}: ParallaxHeroProps) {
  // Guard against SSR hydration issues
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Get scrollY value for parallax effect
  const { scrollY } = useScroll();
  
  // Transform scrollY into a parallax offset
  // As user scrolls down, image moves up (negative Y values)
  // parallaxFactor controls how dramatic the effect is
  const y = useTransform(
    scrollY, 
    [0, height * 1.5], 
    [0, -height * (parallaxFactor / 5)]
  );
  
  // Calculate responsive container sizes
  const containerStyle = {
    height: `${height}px`,
    // Scale height responsively for mobile
    maxHeight: `calc(${height / 16}rem * 0.8 + 5vw)`,
  };

  // Return null during SSR to prevent hydration issues
  if (!isMounted) return null;
  
  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`}
      style={containerStyle}
      aria-hidden="true" // Decorative image
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ 
          y, // Apply parallax scroll effect
          zIndex: 10, // Ensure proper stacking
        }}
        // Initial animation - fade in while moving up
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.2, 
          ease: "easeOut" 
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center 70%", // Position image 70% from the top
            backgroundRepeat: "no-repeat",
            // Force hardware acceleration for smoother animations
            willChange: "transform",
          }}
        />
      </motion.div>
    </div>
  );
}

export default ParallaxHero;