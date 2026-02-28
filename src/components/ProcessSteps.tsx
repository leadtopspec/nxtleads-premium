'use client';

import { useState, useEffect, useRef } from "react";

interface Step {
  number: string;
  title: string;
  description: string;
  features?: string[];
  duration?: string;
  icon?: string;
  color?: string;
}

interface ProcessStepsProps {
  steps: Step[];
  title: string;
  subtitle?: string;
  layout?: 'vertical' | 'horizontal';
  showConnectors?: boolean;
}

export default function ProcessSteps({ 
  steps, 
  title, 
  subtitle, 
  layout = 'horizontal',
  showConnectors = true 
}: ProcessStepsProps) {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleSteps(new Array(steps.length).fill(false));
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateStepsIn();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [steps.length]);

  useEffect(() => {
    // Auto-advance active step every 4 seconds
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [steps.length]);

  const animateStepsIn = () => {
    steps.forEach((_, index) => {
      setTimeout(() => {
        setVisibleSteps(prev => {
          const newVisible = [...prev];
          newVisible[index] = true;
          return newVisible;
        });
      }, index * 200);
    });
  };

  const isVertical = layout === 'vertical';
  const gridClass = isVertical 
    ? 'flex flex-col gap-12' 
    : 'grid gap-8 md:gap-12 lg:grid-cols-4';

  return (
    <div ref={ref} className="relative">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-heading-1 text-white mb-6">{title}</h2>
        {subtitle && (
          <p className="text-body-lg text-navy-300 max-w-3xl mx-auto">{subtitle}</p>
        )}
      </div>

      {/* Steps Container */}
      <div className={`relative ${gridClass}`}>
        {/* Connection Lines for Horizontal Layout */}
        {showConnectors && !isVertical && (
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px">
            <div className="relative h-full">
              {steps.map((_, index) => (
                index < steps.length - 1 && (
                  <div
                    key={index}
                    className="absolute top-0 h-px bg-gradient-to-r from-gold-400/30 to-gold-600/30"
                    style={{
                      left: `${((index + 1) * 100) / steps.length}%`,
                      width: `${100 / steps.length}%`
                    }}
                  >
                    {/* Animated progress line */}
                    <div 
                      className="h-full bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-1000"
                      style={{
                        width: activeStep > index ? '100%' : '0%'
                      }}
                    ></div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Steps */}
        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative group transition-all duration-700 ${
              visibleSteps[index] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            } ${activeStep === index ? 'scale-105' : 'hover:scale-102'}`}
            onMouseEnter={() => setActiveStep(index)}
          >
            {/* Step Card */}
            <div className={`card-premium transition-all duration-500 ${
              activeStep === index 
                ? 'border-gold-400/50 shadow-2xl shadow-gold-400/10' 
                : 'border-navy-700 hover:border-gold-400/30'
            }`}>
              
              {/* Step Number/Icon */}
              <div className="flex items-center mb-6">
                <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  activeStep === index 
                    ? 'bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 scale-110' 
                    : 'bg-navy-800/50 border-2 border-navy-600 text-gold-400 group-hover:border-gold-400/50'
                }`}>
                  {step.icon ? (
                    <span className="text-2xl">{step.icon}</span>
                  ) : (
                    <span className="text-xl font-bold">{step.number}</span>
                  )}
                  
                  {/* Animated ring for active step */}
                  {activeStep === index && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-gold-400 animate-ping opacity-20"></div>
                  )}
                </div>

                {/* Duration Badge */}
                {step.duration && (
                  <div className="ml-auto px-3 py-1 bg-navy-800/50 border border-navy-600 rounded-full text-navy-400 text-xs">
                    {step.duration}
                  </div>
                )}
              </div>

              {/* Content */}
              <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                activeStep === index ? 'text-gold-400' : 'text-white group-hover:text-gold-400'
              }`}>
                {step.title}
              </h3>
              
              <p className="text-navy-300 mb-6 leading-relaxed">
                {step.description}
              </p>

              {/* Features List */}
              {step.features && (
                <ul className="space-y-2">
                  {step.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-300 ${
                        activeStep === index ? 'bg-gold-400' : 'bg-navy-500'
                      }`}></div>
                      <span className="text-navy-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Active Step Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent rounded-2xl transition-opacity duration-500 pointer-events-none ${
                activeStep === index ? 'opacity-100' : 'opacity-0'
              }`}></div>
            </div>

            {/* Vertical Connector */}
            {isVertical && showConnectors && index < steps.length - 1 && (
              <div className="absolute left-8 top-full w-px h-12 bg-gradient-to-b from-gold-400/30 to-transparent"></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Indicators for Mobile */}
      <div className="flex justify-center mt-12 gap-2 lg:hidden">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeStep === index 
                ? 'bg-gold-400 scale-125' 
                : 'bg-navy-600 hover:bg-navy-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Preset step configurations
export const leadProcessSteps: Step[] = [
  {
    number: "01",
    title: "Instant Lead Capture",
    description: "Our advanced systems capture high-intent prospects the moment they express interest. Every lead is verified and scored before entering our exclusive marketplace.",
    features: [
      "Real-time capture technology",
      "AI-powered intent scoring", 
      "Multi-channel sourcing",
      "Instant verification"
    ],
    duration: "< 1 minute",
    icon: "⚡",
    color: "blue"
  },
  {
    number: "02", 
    title: "Quality Assessment",
    description: "Each lead undergoes our proprietary 47-point quality assessment. Only the top 15% make it to our elite marketplace, ensuring maximum conversion potential.",
    features: [
      "47-point quality check",
      "Income verification",
      "Intent validation",
      "Demographic analysis"
    ],
    duration: "2-3 minutes",
    icon: "🎯",
    color: "green"
  },
  {
    number: "03",
    title: "Exclusive Assignment", 
    description: "Qualified leads are exclusively assigned to one elite agent based on territory, specialization, and performance history. No sharing, no competition.",
    features: [
      "Territory matching",
      "Specialization alignment", 
      "Performance weighting",
      "Exclusive ownership"
    ],
    duration: "1-2 minutes",
    icon: "🏆",
    color: "gold"
  },
  {
    number: "04",
    title: "Instant Delivery",
    description: "Complete lead details delivered instantly via SMS, email, and our premium mobile app. Strike while interest is at its peak with real-time notifications.",
    features: [
      "Multi-channel delivery",
      "Real-time notifications",
      "Complete contact details",
      "Conversion tracking"
    ],
    duration: "< 30 seconds",
    icon: "📱",
    color: "purple"
  }
];