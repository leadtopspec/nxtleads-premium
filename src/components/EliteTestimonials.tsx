'use client';

import { useState, useEffect, useRef } from "react";

interface Testimonial {
  name: string;
  title: string;
  company?: string;
  location: string;
  avatar?: string;
  quote: string;
  metrics: {
    value: string;
    label: string;
    improvement: string;
  };
  leadType: string;
  timeframe: string;
  verified: boolean;
  rating?: number;
}

interface EliteTestimonialsProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export default function EliteTestimonials({ testimonials, autoPlay = true, interval = 5000 }: EliteTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, testimonials.length]);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400/10 border border-gold-400/20 rounded-full text-gold-400 text-sm font-semibold mb-6">
            <span>🏆</span>
            <span>Elite Success Stories</span>
          </div>
          <h2 className="text-heading-1 text-white mb-6">
            Real Results from <span className="text-gradient">Elite Agents</span>
          </h2>
          <p className="text-body-lg text-navy-300 max-w-3xl mx-auto">
            See how top-performing agents are using our exclusive leads to build 6-figure+ businesses. 
            These aren't just numbers — they're life-changing transformations.
          </p>
        </div>

        {/* Main Testimonial Showcase */}
        <div 
          className="relative max-w-5xl mx-auto mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Featured Testimonial */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Metrics & Results */}
              <div className="order-2 lg:order-1">
                <div className="card-premium text-center">
                  <div className="mb-8">
                    <div className="text-6xl font-bold text-gradient mb-2">
                      {currentTestimonial.metrics.value}
                    </div>
                    <div className="text-xl text-navy-300 mb-2">
                      {currentTestimonial.metrics.label}
                    </div>
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-900/30 border border-green-500/30 rounded-full text-green-400 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {currentTestimonial.metrics.improvement} improvement
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-lg font-bold text-gold-400">{currentTestimonial.leadType}</div>
                      <div className="text-navy-400 text-sm">Lead Type</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-400">{currentTestimonial.timeframe}</div>
                      <div className="text-navy-400 text-sm">Timeframe</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1">
                        {currentTestimonial.verified && (
                          <>
                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-green-400 text-sm font-semibold">Verified</span>
                          </>
                        )}
                      </div>
                      <div className="text-navy-400 text-sm">Results</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="order-1 lg:order-2">
                <div className="card-premium">
                  {/* Quote */}
                  <div className="mb-8">
                    <div className="text-gold-400 text-4xl mb-4">"</div>
                    <blockquote className="text-lg text-navy-200 leading-relaxed italic">
                      {currentTestimonial.quote}
                    </blockquote>
                    <div className="text-gold-400 text-4xl text-right">"</div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center text-navy-950 font-bold text-xl">
                      {currentTestimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">
                        {currentTestimonial.name}
                      </div>
                      <div className="text-navy-400">
                        {currentTestimonial.title}
                        {currentTestimonial.company && ` • ${currentTestimonial.company}`}
                      </div>
                      <div className="text-navy-500 text-sm">
                        📍 {currentTestimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 glass rounded-xl flex items-center justify-center text-navy-400 hover:text-gold-400 hover:border-gold-400/30 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Progress Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-gold-400 scale-125' 
                      : 'bg-navy-600 hover:bg-navy-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 glass rounded-xl flex items-center justify-center text-navy-400 hover:text-gold-400 hover:border-gold-400/30 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Additional Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={index}
              className={`card-premium group cursor-pointer transition-all duration-500 hover:scale-105 ${
                index === activeIndex ? 'border-gold-400/30' : ''
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-gold-400 mb-1">
                  {testimonial.metrics.value}
                </div>
                <div className="text-navy-400 text-sm">
                  {testimonial.metrics.label}
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center text-navy-950 font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-navy-400 text-xs">
                    {testimonial.location}
                  </div>
                </div>
              </div>
              
              <p className="text-navy-300 text-sm line-clamp-3">
                {testimonial.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Preset testimonials data
export const eliteTestimonials: Testimonial[] = [
  {
    name: "Marcus Chen",
    title: "Elite Agent",
    company: "Pacific Life Solutions",
    location: "San Francisco, CA",
    quote: "EliteLeads Pro completely transformed my business. I went from struggling with $3 shared leads to closing premium $30 exclusive leads at 18% conversion. My annual income jumped from $80K to $340K in just 8 months. This platform is the difference between surviving and thriving in insurance.",
    metrics: {
      value: "+325%",
      label: "Income Increase",
      improvement: "+325%"
    },
    leadType: "IUL & Life",
    timeframe: "8 months",
    verified: true,
    rating: 5
  },
  {
    name: "Sarah Martinez",
    title: "Insurance Broker",
    company: "Elite Financial Group",
    location: "Austin, TX",
    quote: "I was skeptical about paying $27 per lead when I was used to $5 leads. But the quality difference is night and day. These exclusive leads convert 6x higher than anything I've used before. My close rate went from 2% to 14% almost overnight.",
    metrics: {
      value: "14%",
      label: "Conversion Rate",
      improvement: "+600%"
    },
    leadType: "Final Expense",
    timeframe: "4 months",
    verified: true,
    rating: 5
  },
  {
    name: "Robert Johnson",
    title: "Senior Agent",
    company: "Premier Insurance Solutions",
    location: "Tampa, FL",
    quote: "The ROI guarantee isn't just marketing — it's real. I track every lead, and I'm consistently hitting 400%+ ROI. My success manager helped me optimize my approach, and now I'm closing deals faster than ever. Worth every penny.",
    metrics: {
      value: "427%",
      label: "Average ROI",
      improvement: "+427%"
    },
    leadType: "Annuities",
    timeframe: "6 months",
    verified: true,
    rating: 5
  },
  {
    name: "Jennifer Walsh",
    title: "Elite Producer",
    location: "Seattle, WA",
    quote: "What sets EliteLeads apart is the exclusivity. I'm the only agent talking to these prospects. No more racing against 4 other agents to the phone. The leads are fresh, qualified, and ready to buy. My commissions tripled in my first quarter.",
    metrics: {
      value: "+285%",
      label: "Commission Growth",
      improvement: "+285%"
    },
    leadType: "Mortgage Protection",
    timeframe: "3 months",
    verified: true,
    rating: 5
  }
];