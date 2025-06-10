import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Hotspot {
  id: number;
  x: number;
  y: number;
  title: string;
  description: string;
}

const hotspots: Hotspot[] = [
  {
    id: 1,
    x: 20,
    y: 15,
    title: "Navigation Design",
    description: "Streamlined navigation structure increased user engagement by 32%. Key sections are prominently displayed with clear hierarchy."
  },
  {
    id: 2,
    x: 50,
    y: 30,
    title: "Primary CTA",
    description: "Strategic placement of primary CTA increased conversion rate by 24%. Button color and size were optimized through A/B testing."
  },
  {
    id: 3,
    x: 80,
    y: 15,
    title: "Social Proof",
    description: "Customer testimonials and case studies positioned strategically led to 18% increase in form submissions."
  },
  {
    id: 4,
    x: 35,
    y: 60,
    title: "Feature Showcase",
    description: "Visual representation of key features with supporting data improved understanding and reduced support queries by 40%."
  },
  {
    id: 5,
    x: 65,
    y: 70,
    title: "Trust Indicators",
    description: "Integration of security badges and certifications increased trust metrics by 28% according to user surveys."
  }
];

export default function InteractiveViewer() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-[1440px] mx-auto">
      <div className="relative bg-[#f5f5f5] border border-[#e0e0e0] rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
        <img 
          src="https://i.imgur.com/KEBUlZw.jpeg" 
          alt="Verizon B2B Website Design"
          className="w-full h-auto object-contain rounded-lg"
        />
        {hotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            className="absolute cursor-pointer group"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
          >
            <div className="w-5 h-5 rounded-full bg-blue-500/20 border-2 border-blue-500 relative animate-pulse">
              <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
            </div>

            <AnimatePresence>
              {activeHotspot === hotspot.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 w-[300px] bg-white rounded-lg shadow-lg p-4 mt-2"
                  style={{
                    left: hotspot.x > 50 ? 'auto' : '100%',
                    right: hotspot.x > 50 ? '100%' : 'auto',
                    marginLeft: hotspot.x > 50 ? '-8px' : '8px',
                    marginRight: hotspot.x > 50 ? '8px' : '-8px'
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspot(null);
                    }}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                  <h3 className="font-semibold mb-2">{hotspot.title}</h3>
                  <p className="text-sm text-gray-600">{hotspot.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}