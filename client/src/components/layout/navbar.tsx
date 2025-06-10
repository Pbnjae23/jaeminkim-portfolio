import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Don't close if clicking on the hamburger button itself or case studies button
      if (menuRef.current && !menuRef.current.contains(target)) {
        // Check if the click is on the hamburger toggle button
        const hamburgerButton = document.querySelector('[aria-label="Toggle mobile menu"]');
        if (hamburgerButton && hamburgerButton.contains(target)) {
          return; // Don't close when clicking the hamburger button
        }
        
        setMobileMenuOpen(false);
        setCaseStudiesOpen(false); // Also close case studies when clicking outside
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu only when navigating to actual pages (not dropdown interactions)
  useEffect(() => {
    // Close mobile menu only when navigating to main pages (About, Work, Contact)
    // Don't close when just toggling dropdowns or staying on case studies
    const mainPages = ["/about", "/work", "/contact"];
    if (mainPages.includes(location)) {
      setMobileMenuOpen(false);
    }
    // Close case studies dropdown when navigating away from case studies section
    if (!location.startsWith("/case-studies")) {
      setCaseStudiesOpen(false);
    }
  }, [location]);

  // Scroll detection with Intersection Observer for pill container
  useEffect(() => {
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '120px'; // Trigger point for scroll detection
    sentinel.style.height = '1px';
    sentinel.style.width = '100%';
    sentinel.style.pointerEvents = 'none';
    document.body.appendChild(sentinel);
    sentinelRef.current = sentinel;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When sentinel is NOT intersecting (user has scrolled past 120px)
          setIsScrolled(!entry.isIntersecting);
        });
      },
      {
        threshold: 0,
        rootMargin: '0px'
      }
    );

    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      observer.disconnect();
      if (sentinelRef.current && document.body.contains(sentinelRef.current)) {
        document.body.removeChild(sentinelRef.current);
      }
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed left-0 right-0 z-50"
      style={{ top: '24px' }}
    >
      <div className="px-4 md:px-8 lg:px-16">
        <div className="flex items-baseline h-16">
          <div className="flex-shrink-0 min-w-[100px]">
            <Link href="/">
              <div className="flex items-center rounded-full py-2 cursor-pointer" style={{ backgroundColor: '#02343F', paddingLeft: '30px', paddingRight: '30px' }}>
                <img 
                  src="https://i.imgur.com/8BwJKY3.png" 
                  alt="Logo" 
                  className="w-8 h-8 object-contain"
                  style={{ 
                    transform: 'scale(0.885)', // 15% increase from 0.77
                    filter: 'brightness(0) saturate(100%) invert(100%)',
                    opacity: 1,
                    marginRight: '10px'
                  }}
                />
                <div style={{ width: '1px', height: '22px', backgroundColor: '#ffffff' }}></div>
                <span style={{ marginLeft: '10px', color: 'white', fontSize: '1.15em', lineHeight: '1.2' }}>Jaemin Kim</span>
              </div>
            </Link>
          </div>

          <div className="flex-grow flex justify-end">
            {/* Desktop Menu with Pill Container */}
            <div 
              className="hidden md:flex space-x-8 items-baseline px-6 py-3 rounded-full transition-all duration-300 ease-in-out" 
              style={{ 
                transform: 'translateY(-8px)',
                backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(10px)' : 'none',
                boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
                border: isScrolled ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent'
              }}
            >
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={cn(
                      "transition-colors cursor-pointer",
                      location === link.href && (isScrolled ? "border-b border-[#02343F]" : "border-b border-[#02343F]")
                    )}
                    style={{ 
                      color: isScrolled ? '#02343F' : '#02343F', 
                      fontSize: '1.15em',
                      lineHeight: '1.2',
                      paddingBottom: location === link.href ? '5px' : '0'
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              
              {/* Case Studies Dropdown */}
              <div className="relative">
                <button 
                  className="flex items-center transition-colors cursor-pointer"
                  style={{ color: isScrolled ? '#02343F' : '#02343F' }}
                  onClick={() => setCaseStudiesOpen(!caseStudiesOpen)}
                  onBlur={() => setTimeout(() => setCaseStudiesOpen(false), 100)}
                >
                  <span className={cn(
                    location.startsWith("/case-studies") && (isScrolled ? "border-b border-[#02343F]" : "border-b border-[#02343F]")
                  )} style={{ 
                    color: isScrolled ? '#02343F' : '#02343F', 
                    fontSize: '1.15em',
                    lineHeight: '1.2',
                    paddingBottom: location.startsWith("/case-studies") ? '5px' : '0'
                  }}>Case Studies</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>
                
                {caseStudiesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                  >
                    <div className="py-1">
                      <Link href="/case-studies/verizon">
                        <a className="block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#02343F' }}>
                          Verizon 5G Edge Solutions
                        </a>
                      </Link>
                      <Link href="/case-studies/lg">
                        <a className="block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#02343F' }}>
                          LG National Retail Redesign
                        </a>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden" ref={menuRef}>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#02343F] hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white shadow-lg border-t border-gray-200"
            style={{ marginTop: '8px' }}
          >
            <div className="px-4 py-4 space-y-3">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    className={cn(
                      "block py-3 transition-colors cursor-pointer",
                      location === link.href && "border-b border-[#02343F]"
                    )}
                    style={{ 
                      color: '#02343F', 
                      fontSize: '1.15em',
                      lineHeight: '1.2',
                      paddingBottom: location === link.href ? '2px' : '0'
                    }}
                    onClick={(e) => {
                      // Close menu when clicking actual navigation links
                      setMobileMenuOpen(false);
                      setCaseStudiesOpen(false);
                    }}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}
              
              {/* Mobile Case Studies Section */}
              <div className="py-3">
                <button 
                  className="flex items-center transition-colors cursor-pointer w-full"
                  style={{ color: '#02343F' }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCaseStudiesOpen(!caseStudiesOpen);
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <span className={cn(
                    location.startsWith("/case-studies") && "border-b border-[#02343F]"
                  )} style={{ 
                    color: '#02343F', 
                    fontSize: '1.15em',
                    lineHeight: '1.2',
                    paddingBottom: location.startsWith("/case-studies") ? '2px' : '0'
                  }}>Case Studies</span>
                  <ChevronDown 
                    size={16} 
                    className={cn(
                      "ml-1 transition-transform duration-200",
                      caseStudiesOpen && "rotate-180"
                    )}
                  />
                </button>
                
                {caseStudiesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 mt-3 space-y-2"
                  >
                    <Link href="/case-studies/verizon">
                      <div 
                        className="block py-2 text-sm hover:bg-gray-100 rounded px-2 transition-colors" 
                        style={{ color: '#02343F' }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Verizon 5G Edge Solutions
                      </div>
                    </Link>
                    <Link href="/case-studies/lg">
                      <div 
                        className="block py-2 text-sm hover:bg-gray-100 rounded px-2 transition-colors" 
                        style={{ color: '#02343F' }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        LG National Retail Redesign
                      </div>
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}