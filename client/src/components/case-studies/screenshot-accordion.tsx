import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Hotspot {
  x: number;
  y: number;
  text: string;
}

interface AccordionItem {
  title: string;
  imageUrl: string;
  hotspots: Hotspot[];
}

const mainLPHotspots: Hotspot[] = [
  { x: 60, y: 8, text: "Looping video provides dynamic hero backdrop that supports headline and subhead. CTA placement optimizes full video access and engagement." },
  { x: 65, y: 13.5, text: "Hero transitions to clear presentation of Public and Private MEC offerings. User-centric design balances quick overview for new visitors with detailed information for interested prospects." },
  { x: 55, y: 28, text: "RTB module builds product trust through concise messaging. Icons create visual shortcuts to specific benefits." },
  { x: 32, y: 39, text: "Centered grey module showcases key 5G partners." },
  { x: 63, y: 48, text: "Carousel showcases real-world application examples. Users scroll through individual case study cards." },
  { x: 50, y: 60, text: "Interactive flip-tiles reveal detailed solution information. Users explore 5G edge offerings through engaging tile interactions." },
  { x: 62, y: 70, text: "Interactive FAQ section utilizes accordion design. Questions expand to reveal answers upon user engagement." },
];

const defaultHotspots: Hotspot[] = [
  { x: 15, y: 8, text: "Hero section showcasing 5G Edge with private MEC capabilities and primary messaging with CTA." },
  { x: 80, y: 14.5, text: "Educational animated module explaining how private MEC works with technical diagram and overview." },
  { x: 35, y: 24, text: "Benefits overview highlighting data security, control, and key advantages of private MEC solutions." },
  { x: 20, y: 32, text: "MEC comparison section contrasting public MEC vs private MEC options and capabilities." },
  { x: 85, y: 41, text: "Partnership showcase featuring collaboration messaging with AWS and other technology partners." },
  { x: 45, y: 52.5, text: "Business case studies demonstrating real-world applications across manufacturing, engagement, and network scenarios." },
  { x: 25, y: 58, text: "Solution showcase featuring automated guided vehicles, quality assurance, and deployment examples." },
  { x: 75, y: 68, text: "Resource center with insights, case studies, and educational content about private MEC benefits." },
  { x: 40, y: 74, text: "FAQ section addressing common questions about private MEC implementation and capabilities." },
  { x: 65, y: 81.5, text: "Business needs section targeting developers, innovators, and partners with specific solutions." },
];

const googleCloudHotspots: Hotspot[] = [
  { x: 20, y: 6, text: "Hero section featuring Verizon 5G Edge with Google Distributed Cloud Edge partnership and key messaging." },
  { x: 85, y: 15, text: "Four-benefit showcase highlighting localized data, proven infrastructure, low latency, and full Verizon management." },
  { x: 75, y: 32, text: "Technical overview diagram illustrating 5G Edge architecture with GDC Edge integration points." },
  { x: 15, y: 45, text: "Resource exploration grid with educational links about MEC technology and implementation." },
  { x: 90, y: 51.5, text: "FAQ section addressing common questions about Google Distributed Cloud Edge integration." },
  { x: 45, y: 78, text: "Contact and engagement footer with form submission, phone contact, and callback request options." },
];

const cybersecurityHotspots: Hotspot[] = [
  { x: 15, y: 8, text: "Primary hero showcasing the 2022 Data Breach Investigations Report with animated green data visualization background and main CTA." },
  { x: 85, y: 18, text: "Key statistics module highlighting critical data breach insights with server room imagery background." },
  { x: 30, y: 26, text: "Call-to-action section promoting security awareness with secondary CTA and contact information." },
  { x: 70, y: 31, text: "Three-column resource grid featuring downloadable content, infographics, and data insights with CTAs." },
  { x: 10, y: 40, text: "Educational content showcase presenting multiple DBIR webinar options in a structured grid layout." },
  { x: 90, y: 52, text: "Interactive data visualization displaying breach trend data from 2008-2022 with signup CTA." },
  { x: 45, y: 62, text: "Dual-panel section offering specialized reports for small business and public sector audiences." },
  { x: 25, y: 75, text: "Historical report showcase featuring previous year publications with download capabilities and navigation." },
  { x: 75, y: 88, text: "Contact and engagement footer with form submission, phone contact, and callback request options." },
];

const portfolioHotspots: Hotspot[] = [
  { x: 60, y: 4.5, text: "Dual-column hero layout on black background presents 5G edge branding and key messaging." },
  { x: 65, y: 15, text: "Clean tile layout presents 6 primary 5G edge benefits with supporting iconography." },
  { x: 65, y: 34, text: "Grid-based solution explorer with filtering capabilities and prominent featured content." },
  { x: 50, y: 70, text: "Module enabling users to discover 5G edge sub-property options." },
  { x: 66, y: 82, text: "Three-option footer: sign in, contact representative, or request a call." },
];

const crowdAnalyticsHotspots: Hotspot[] = [
  { 
    x: 20, 
    y: 8, 
    text: "Hero section featuring 5G Edge Crowd Analytics with crowd imagery and primary value proposition messaging." 
  },
  { 
    x: 75, 
    y: 18, 
    text: "Technology overview explaining crowd management transformation capabilities with supporting descriptive content." 
  },
  { 
    x: 35, 
    y: 26, 
    text: "Three-benefit showcase highlighting reduced wait times, traffic flow management, and improved wayfinding solutions." 
  },
  { 
    x: 85, 
    y: 35, 
    text: "Guest experience section with crowd imagery showcasing operational improvements and solution brief CTA." 
  },
  { 
    x: 15, 
    y: 44, 
    text: "Six-feature grid displaying Verizon 5G Edge capabilities, congestion analytics, and implementation benefits." 
  },
  { 
    x: 65, 
    y: 54, 
    text: "Resources and insights section with three-column layout featuring stadium solutions, 5G possibilities, and crowd management guidance." 
  },
  { 
    x: 40, 
    y: 68, 
    text: "Contact and engagement section with country selection, phone contact, and callback request functionality." 
  }
];

const cashierlessHotspots: Hotspot[] = [
  { 
    x: 10, 
    y: 8, 
    text: "Hero section featuring 5G Edge Crowd Analytics with crowd imagery and primary value proposition messaging." 
  },
  { 
    x: 80, 
    y: 18, 
    text: "Technology overview explaining crowd management transformation capabilities with supporting descriptive content." 
  },
  { 
    x: 25, 
    y: 26, 
    text: "Three-benefit showcase highlighting reduced wait times, traffic flow management, and improved wayfinding solutions." 
  },
  { 
    x: 65, 
    y: 34, 
    text: "Full-width media module featuring high-quality photography of in-venue solution use; functions as visual interlude and contextual reinforcement." 
  },
  { 
    x: 15, 
    y: 46.5, 
    text: "Grid-based tile module presenting stakeholder-provided metrics on solution impact, paired with contextual visuals and iconography." 
  },
  { 
    x: 60, 
    y: 68, 
    text: "Insights and resources section featuring three-column layout with 5G stadium use cases, cross-industry applications, and Edge MEC benefits." 
  },
  { 
    x: 35, 
    y: 72, 
    text: "Engagement and contact section with country selector, direct sales phone number, and callback request functionality." 
  }
];

const lgRetailHotspots: Hotspot[] = [
  { 
    x: 20, 
    y: 10, 
    text: "Hero section featuring the hexagonal honeycomb design system. The visual metaphor of connected hexagons represents the unified LG ecosystem of product divisions." 
  },
  { 
    x: 75, 
    y: 18, 
    text: "Primary navigation using the honeycomb structure to organize different product categories in an intuitive layout that guides the user's journey." 
  },
  { 
    x: 35, 
    y: 30, 
    text: "Home Appliances module using hexagonal tiles to showcase different product lines while maintaining visual consistency with the overall design system." 
  },
  { 
    x: 65, 
    y: 40, 
    text: "Home Entertainment section implementing the honeycomb layout to feature TVs, audio systems, and connected entertainment products within the unified ecosystem." 
  },
  { 
    x: 25, 
    y: 50, 
    text: "Mobile devices category using the hexagonal design system to showcase smartphones and tablets with product-specific imagery inside each hexagon." 
  },
  { 
    x: 70, 
    y: 60, 
    text: "Interactive product finder using the honeycomb layout as both a visual element and functional navigation system that bridges across product categories." 
  },
  { 
    x: 40, 
    y: 70, 
    text: "Seasonal promotion section maintaining the hexagonal theme while highlighting special offers across multiple product categories." 
  },
  { 
    x: 50, 
    y: 85, 
    text: "Footer section with hexagonal social media icons and support links that complete the unified brand experience across the page." 
  }
];

const accordionItems: AccordionItem[] = [
  { title: "5G Edge Main LP", imageUrl: "https://i.imgur.com/KEBUlZw.jpeg", hotspots: mainLPHotspots },
  { title: "5G Edge Portfolio", imageUrl: "https://i.imgur.com/NOHlShZ.jpeg", hotspots: portfolioHotspots },
  { title: "Cybersecurity LP", imageUrl: "https://i.imgur.com/KT4CQbG.jpeg", hotspots: cybersecurityHotspots },
  { title: "Google Distributed Cloud Edge", imageUrl: "https://i.imgur.com/ZhsnkDC.jpeg", hotspots: googleCloudHotspots },
  { title: "Private MEC", imageUrl: "https://i.imgur.com/eQJJH9f.jpeg", hotspots: defaultHotspots },
  { title: "Crowd Analytics", imageUrl: "https://i.imgur.com/koRQUmL.jpeg", hotspots: crowdAnalyticsHotspots },
  { title: "Cashierless Checkout", imageUrl: "https://i.imgur.com/4gWijoy.jpeg", hotspots: cashierlessHotspots },
  { title: "LG Retail Design System", imageUrl: "https://i.imgur.com/SiBGEet.jpeg", hotspots: lgRetailHotspots },
];

export default function ScreenshotAccordion() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="w-full mt-4 sm:mt-0" style={{ color: '#02343F' }}>
      {accordionItems.map((item, index) => (
        <div key={index} className="border-b" style={{ borderColor: '#02343F' }}>
          <button
            className="w-full flex items-center justify-between py-6 text-left"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            style={{ color: '#02343F' }}
          >
            <span className="text-lg font-medium" style={{ color: '#02343F' }}>{item.title}</span>
            <motion.div
              animate={{ rotate: expandedIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ color: '#02343F' }}
            >
              <ChevronDown className="w-6 h-6" style={{ color: '#02343F' }} />
            </motion.div>
          </button>

          <AnimatePresence>
            {expandedIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden"
              >
                <div className="pb-6">
                  <div className="relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-auto"
                    />
                    {item.hotspots.map((hotspot, spotIndex) => (
                      <div
                        key={spotIndex}
                        className="absolute group cursor-pointer"
                        style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                      >
                        <div className="w-6 h-6 rounded-full border-2 relative animate-pulse" style={{ backgroundColor: 'rgba(2, 52, 63, 0.5)', borderColor: '#02343F' }}>
                          <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: 'rgba(2, 52, 63, 0.5)' }} />
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="px-3 py-2 rounded shadow-lg text-sm w-64 whitespace-normal word-wrap break-word overflow-wrap break-word leading-snug" style={{ backgroundColor: '#02343F', color: 'white', border: '1px solid #02343F' }}>
                            {hotspot.text}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}