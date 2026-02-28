'use client';

import { useState, useEffect, useRef } from "react";

interface Metric {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
  color: string;
  icon?: string;
}

interface MetricsShowcaseProps {
  metrics: Metric[];
  animationDelay?: number;
}

export default function MetricsShowcase({ metrics, animationDelay = 100 }: MetricsShowcaseProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateNumbers();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateNumbers = () => {
    metrics.forEach((metric, index) => {
      setTimeout(() => {
        const numericValue = parseFloat(metric.value.replace(/[^\d.]/g, ''));
        if (!isNaN(numericValue)) {
          animateValue(numericValue, metric.value, index);
        } else {
          setAnimatedValues(prev => {
            const newValues = [...prev];
            newValues[index] = metric.value;
            return newValues;
          });
        }
      }, index * animationDelay);
    });
  };

  const animateValue = (target: number, originalValue: string, index: number) => {
    const duration = 2000;
    const startTime = Date.now();
    const prefix = originalValue.match(/^[^\d]*/)?.[0] || '';
    const suffix = originalValue.match(/[^\d]*$/)?.[0] || '';

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(target * easeOut);
      
      setAnimatedValues(prev => {
        const newValues = [...prev];
        newValues[index] = prefix + currentValue.toLocaleString() + suffix;
        return newValues;
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedValues(prev => {
          const newValues = [...prev];
          newValues[index] = originalValue;
          return newValues;
        });
      }
    };

    animate();
  };

  return (
    <div ref={ref} className="grid gap-6 md:gap-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`group card-premium text-center transition-all duration-700 hover:scale-105 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${index * animationDelay}ms` }}
          >
            {/* Icon */}
            {metric.icon && (
              <div className="mb-4 text-4xl group-hover:scale-110 transition-transform duration-300">
                {metric.icon}
              </div>
            )}

            {/* Animated Value */}
            <div className={`text-4xl md:text-5xl font-bold ${metric.color} mb-2 group-hover:text-glow transition-all duration-300`}>
              {animatedValues[index] || '0'}
            </div>

            {/* Label */}
            <div className="text-navy-400 text-sm md:text-base font-medium">
              {metric.label}
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Preset metric configurations
export const roiMetrics: Metric[] = [
  {
    value: "387%",
    label: "Average ROI",
    color: "text-gold-400",
    icon: "📈"
  },
  {
    value: "15%",
    label: "Conversion Rate",
    color: "text-green-400",
    icon: "🎯"
  },
  {
    value: "$2,100,000",
    label: "Generated This Month",
    color: "text-blue-400",
    icon: "💰"
  },
  {
    value: "5,000+",
    label: "Elite Agents",
    color: "text-purple-400",
    icon: "👥"
  }
];

export const performanceMetrics: Metric[] = [
  {
    value: "98.7%",
    label: "Client Satisfaction",
    color: "text-green-400",
    icon: "⭐"
  },
  {
    value: "2.3",
    label: "Avg Delivery Time (min)",
    color: "text-blue-400",
    icon: "⚡"
  },
  {
    value: "127",
    label: "Available Leads Now",
    color: "text-gold-400",
    icon: "📊"
  },
  {
    value: "24/7",
    label: "Elite Support",
    color: "text-purple-400",
    icon: "🛟"
  }
];