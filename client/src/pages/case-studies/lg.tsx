import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Lightbox Modal Component
interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

function LightboxModal({ isOpen, onClose, imageSrc, imageAlt }: LightboxModalProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Prevent body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscKey);
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Dark overlay backdrop */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Modal image container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 max-w-[90vw] max-h-[90vh]"
          >
            <img 
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


export default function LGCaseStudy() {
  // State for lightbox modal
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState({
    src: '',
    alt: ''
  });

  // Animation state for section 2
  const section2Ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const lastScrollY = useRef(0);

  // Function to open the lightbox
  const openLightbox = (src: string, alt: string) => {
    setCurrentImage({ src, alt });
    setLightboxOpen(true);
  };

  // Function to close the lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Section 2 animation - same as Verizon
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

  return (
    <div style={{ backgroundColor: '#F0EDCC' }}>
      {/* Lightbox Modal */}
      <LightboxModal 
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        imageSrc={currentImage.src}
        imageAlt={currentImage.alt}
      />
      
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
                LG National Retail Redesign
              </h2>
            </motion.div>
            {/* Main headline */}
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-normal leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            >
              Modernizing Third-Party Retail Operations to Drive Growth at LG
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
                <h2 className="font-bold mb-2" style={{ fontSize: '1.15em', color: '#02343F' }}>LG USA Retail Ecosystem</h2>
                <a 
                  href="https://lg.com/us" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: '#02343F' }}
                >
                  lg.com/us
                </a>
              </div>
              
              <div 
                className="section2-content border-b pb-4"
                style={{ borderColor: '#02343F' }}
              >
                <h2 className="font-bold mb-2" style={{ fontSize: '1.15em', color: '#02343F' }}>Intro</h2>
                <p style={{ color: '#02343F' }}>
                  LG USA's cohesive retail design system that unifies multiple departments for third-party retail partners.
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
                  [Problem content will be provided later]
                </p>
              </div>
              
              <div 
                className="section2-content border-b pb-4"
                style={{ borderColor: '#02343F' }}
              >
                <h2 className="font-bold mb-2" style={{ fontSize: '1.15em', color: '#02343F' }}>Solution</h2>
                <p style={{ color: '#02343F' }}>
                  [Solution content will be provided later]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      {/* Gallery Section */}
      <div style={{ backgroundColor: "#1E1E1E" }} className="px-4 py-20 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-2 sm:mb-0">
              Implementations Across Different Channels
            </h2>
            <span className="text-sm text-gray-400">Click images to enlarge</span>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Image 1 */}
            <div className="group">
              <div 
                className="overflow-hidden rounded-lg mb-2 cursor-pointer"
                onClick={() => openLightbox(
                  "https://i.imgur.com/5WAHZkL.png",
                  "Best Buy homepage featuring LG's honeycomb design system"
                )}
              >
                <img 
                  src="https://i.imgur.com/5WAHZkL.png" 
                  alt="Best Buy homepage featuring LG's honeycomb design system" 
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-sm text-gray-400">Best Buy homepage with LG's honeycomb layout</p>
            </div>
            
            {/* Image 2 */}
            <div className="group">
              <div 
                className="overflow-hidden rounded-lg mb-2 cursor-pointer"
                onClick={() => openLightbox(
                  "https://i.imgur.com/Up48a5P.png",
                  "Instagram post showcasing LG products with hexagonal design elements"
                )}
              >
                <img 
                  src="https://i.imgur.com/Up48a5P.png" 
                  alt="Instagram post showcasing LG products with hexagonal design elements" 
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-sm text-gray-400">Instagram post with unified hexagonal brand elements</p>
            </div>
            
            {/* Image 3 */}
            <div className="group">
              <div 
                className="overflow-hidden rounded-lg mb-2 cursor-pointer"
                onClick={() => openLightbox(
                  "https://i.imgur.com/kRRwxoN.jpeg",
                  "Print circular featuring LG products with honeycomb design system"
                )}
              >
                <img 
                  src="https://i.imgur.com/kRRwxoN.jpeg" 
                  alt="Print circular featuring LG products with honeycomb design system" 
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-sm text-gray-400">Print circular maintaining hexagonal design language</p>
            </div>
            
            {/* Image 4 */}
            <div className="group">
              <div 
                className="overflow-hidden rounded-lg mb-2 cursor-pointer"
                onClick={() => openLightbox(
                  "https://i.imgur.com/5FbItrr.png",
                  "Email design for LG product promotions using honeycomb layout"
                )}
              >
                <img 
                  src="https://i.imgur.com/5FbItrr.png" 
                  alt="Email design for LG product promotions using honeycomb layout" 
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-sm text-gray-400">Email campaign design with honeycomb-inspired structure</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white px-4 pt-16 pb-32 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Content grid with two columns */}
          <div className="grid md:grid-cols-2 gap-[60px] md:gap-[120px]">
            {/* Left column - Results heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-[42px]"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Results
              </h1>
            </motion.div>

            {/* Right column - Results content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-end h-full"
            >
              <div className="space-y-[42px]">
                <div className="border-b border-gray-200 pb-4">
                  <p className="text-gray-600">
                    This new design has been well-received by clients and has helped create a more cohesive and unified 
                    brand image for LG. By using the honeycomb structure as inspiration, LG created a design that is both 
                    visually appealing and functional. The hexagons represent different LG divisions that are connected 
                    with one another, creating a sense of unity and cohesion across the brand.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}