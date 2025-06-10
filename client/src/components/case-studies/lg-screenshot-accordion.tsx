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

const lgMainHotspots: Hotspot[] = [
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

const lgBestBuyHotspots: Hotspot[] = [
  { 
    x: 15, 
    y: 8, 
    text: "Best Buy adaptation of the honeycomb design system with LG brand colors and logo placement integrated into the retailer's platform." 
  },
  { 
    x: 80, 
    y: 15, 
    text: "Product category navigation using modified hexagon shapes that conform to Best Buy's grid system while maintaining the LG design language." 
  },
  { 
    x: 30, 
    y: 30, 
    text: "Home appliance display with hexagonal product highlights showcasing refrigerators, washers, and cooking appliances in a unified visual system." 
  },
  { 
    x: 60, 
    y: 45, 
    text: "Television and audio showcase using honeycomb layouts to highlight key features and specifications in a visually consistent manner." 
  },
  { 
    x: 25, 
    y: 60, 
    text: "Mobile phones section with hexagonal product cards that maintain brand consistency across different product categories." 
  },
  { 
    x: 75, 
    y: 75, 
    text: "Special promotions area using the honeycomb grid to highlight cross-category bundles and multi-product discounts." 
  }
];

const lgCostcoHotspots: Hotspot[] = [
  { 
    x: 20, 
    y: 12, 
    text: "Costco implementation of the LG honeycomb design system adapted to the wholesale club's visual guidelines and e-commerce platform." 
  },
  { 
    x: 70, 
    y: 20, 
    text: "Bulk purchase options highlighted within hexagonal tiles, emphasizing Costco's value proposition while maintaining LG's design system." 
  },
  { 
    x: 40, 
    y: 35, 
    text: "Home appliance bundles showcased in connected hexagons to visually represent complete kitchen or laundry solutions." 
  },
  { 
    x: 80, 
    y: 50, 
    text: "Television wall display recreated digitally with hexagonal highlighting of featured models and member-only pricing." 
  },
  { 
    x: 30, 
    y: 65, 
    text: "Exclusive Costco models highlighted with special hexagonal badges to indicate member-only features and extended warranties." 
  },
  { 
    x: 60, 
    y: 80, 
    text: "Member reviews and ratings integrated into the honeycomb layout, providing social proof within the consistent design system." 
  }
];

const lgPrintCircularHotspots: Hotspot[] = [
  { 
    x: 25, 
    y: 15, 
    text: "Printed circular implementation of the honeycomb design system, creating visual consistency between digital and print media." 
  },
  { 
    x: 75, 
    y: 25, 
    text: "Product photography framed in hexagonal shapes to maintain the design system across all marketing materials." 
  },
  { 
    x: 30, 
    y: 45, 
    text: "Price and promotion callouts using hexagonal badges that draw attention while reinforcing the unified design language." 
  },
  { 
    x: 65, 
    y: 60, 
    text: "Multi-page spreads using interconnected hexagons that guide the reader through different product categories." 
  },
  { 
    x: 40, 
    y: 75, 
    text: "QR codes linked to digital experiences, framed in hexagonal shapes to maintain design consistency across channels." 
  }
];

const accordionItems: AccordionItem[] = [
  { title: "LG Retail Design System - Main", imageUrl: "https://i.imgur.com/Si55Eet.jpeg", hotspots: lgMainHotspots },
  { title: "LG at Best Buy", imageUrl: "https://i.imgur.com/Si55Eet.jpeg", hotspots: lgBestBuyHotspots },
  { title: "LG at Costco", imageUrl: "https://i.imgur.com/Si55Eet.jpeg", hotspots: lgCostcoHotspots },
  { title: "LG Print & Digital Circulars", imageUrl: "https://i.imgur.com/Si55Eet.jpeg", hotspots: lgPrintCircularHotspots },
];

export default function LGScreenshotAccordion() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="w-full text-white mt-4 sm:mt-0">
      {accordionItems.map((item, index) => (
        <div key={index} className="border-b border-gray-700">
          <button
            className="w-full flex items-center justify-between py-6 text-left"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <span className="text-lg font-medium">{item.title}</span>
            <motion.div
              animate={{ rotate: expandedIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-6 h-6" />
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
                        <div className="w-6 h-6 rounded-full bg-blue-500/50 border-2 border-white relative animate-pulse">
                          <div className="absolute inset-0 rounded-full bg-blue-500/50 animate-ping" />
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black px-3 py-2 rounded shadow-lg text-sm border border-white w-64 whitespace-normal word-wrap break-word overflow-wrap break-word leading-snug">
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