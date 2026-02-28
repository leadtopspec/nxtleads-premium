'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AnimatedText from "./AnimatedText";
import MetricsShowcase from "./MetricsShowcase";

export default function RevolutionaryHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentMetric, setCurrentMetric] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const transformWords = [
    "exclusive",
    "profitable", 
    "premium",
    "guaranteed",
    "elite",
    "converting",
    "verified",
    "legendary"
  ];

  const liveMetrics = [
    { value: '$1,247,392', label: 'Elite agents earned today', color: 'text-gold-400' },
    { value: '15.2%', label: 'Average close rate this month', color: 'text-green-400' },
    { value: '1.8min', label: 'Average lead delivery time', color: 'text-blue-400' },
    { value: '94', label: 'Exclusive leads available now', color: 'text-purple-400' },
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    // Rotate metrics
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % liveMetrics.length);
    }, 3500);

    // Mouse tracking for interactive effects (only in browser)
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      clearInterval(interval);
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Advanced Background System */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950">
        {/* Animated Mesh Gradient */}
        <div 
          className="absolute inset-0 opacity-30 transition-transform duration-1000"
          style={{
            background: `radial-gradient(600px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(234,179,8,0.15), transparent 40%)`
          }}
          suppressHydrationWarning
        ></div>
        
        {/* Premium Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(rgba(234,179,8,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.1)_1px,transparent_1px)] bg-[size:6rem_6rem]"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400/3 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-400/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-400/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '-4s' }}></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        
        {/* Elite Status Badge */}
        <div className={`mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-4 px-8 py-4 glass rounded-full border border-gold-400/30">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gold-400 rounded-full animate-pulse"></div>
              <span className="text-gold-400 font-bold text-sm tracking-wide">ELITE STATUS</span>
            </div>
            <div className="w-px h-4 bg-gold-400/30"></div>
            <span className="text-navy-300 text-sm">5000+ Top Performers</span>
            <div className="w-px h-4 bg-gold-400/30"></div>
            <span className="text-navy-300 text-sm">$100M+ Generated</span>
          </div>
        </div>

        {/* Revolutionary Headline */}
        <div className={`mb-12 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="text-hero text-white leading-none mb-6">
            The world's most{' '}
            <br className="hidden sm:block" />
            <span className="relative inline-block">
              <AnimatedText 
                words={transformWords}
                className="text-gradient text-glow"
                interval={3000}
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-gold-400/20 via-transparent to-gold-600/20 rounded-lg blur-xl"></div>
            </span>
            <br />
            <span className="text-heading-1 text-navy-300 font-normal">
              insurance leads for{' '}
              <span className="text-white font-bold">elite agents</span>
            </span>
          </h1>
          
          <p className="text-body-lg text-navy-200 max-w-4xl mx-auto leading-relaxed">
            Join the industry's top 1% who earn{' '}
            <span className="text-gold-400 font-semibold">6+ figures annually</span>{' '}
            with our premium lead program. Every lead is{' '}
            <span className="text-gold-400 font-semibold">100% exclusive to you</span>{' '}
            — no sharing, no competition, just pure profit.
          </p>
        </div>

        {/* Value Propositions */}
        <div className={`mb-12 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: '💎', text: '$25-30/Lead', subtext: 'Premium Pricing' },
              { icon: '🎯', text: '15% Conversion', subtext: 'vs 2-3% Industry' },
              { icon: '⚡', text: '<5min Delivery', subtext: 'Lightning Fast' },
              { icon: '🏆', text: 'High ROI', subtext: 'Premium Quality' }
            ].map((item, index) => (
              <div key={index} className="group p-4 glass rounded-xl hover:scale-105 transition-all duration-300">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="text-white font-bold text-sm">{item.text}</div>
                <div className="text-navy-400 text-xs">{item.subtext}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium CTAs */}
        <div className={`mb-16 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl mx-auto">
            <Link href="/apply" className="group btn-primary w-full sm:w-auto relative overflow-hidden">
              <span className="relative z-10">Apply for Elite Access</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gold-300 to-gold-500 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </Link>
            
            <Link href="/demo" className="group btn-secondary w-full sm:w-auto flex items-center justify-center">
              <svg className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M12 7a5 5 0 105 5v-.5" />
              </svg>
              Watch Live Demo
            </Link>
          </div>
          
          <p className="text-navy-400 text-sm mt-4 max-w-md mx-auto">
            Elite application required. Not all agents qualify for our exclusive program.
          </p>
        </div>

        {/* Live Metrics Display */}
        <div className={`transition-all duration-1000 delay-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Real-time Showcase */}
          <div className="mb-8">
            <div className="glass rounded-2xl p-6 max-w-md mx-auto border border-gold-400/20">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-navy-400 font-semibold tracking-wide">LIVE DATA</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className={`text-3xl font-bold ${liveMetrics[currentMetric].color} transition-all duration-700 transform scale-100`} suppressHydrationWarning>
                {liveMetrics[currentMetric].value}
              </div>
              <div className="text-navy-400 text-sm" suppressHydrationWarning>
                {liveMetrics[currentMetric].label}
              </div>
            </div>
          </div>

          {/* Elite Performance Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: '5,000+', label: 'Elite Agents', icon: '👥' },
              { value: '98.7%', label: 'Satisfaction Rate', icon: '⭐' },
              { value: '$2.1M', label: 'Generated This Week', icon: '💰' },
              { value: '99.9%', label: 'Uptime SLA', icon: '🚀' }
            ].map((metric, index) => (
              <div 
                key={index} 
                className="glass rounded-xl p-4 text-center group hover:scale-105 transition-all duration-300 hover:border-gold-400/30"
              >
                <div className="text-xl mb-1 group-hover:scale-110 transition-transform">{metric.icon}</div>
                <div className="text-xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-navy-400 text-xs">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <span className="text-navy-400 text-xs font-medium group-hover:text-gold-400 transition-colors">
              Discover More
            </span>
            <div className="w-8 h-12 border-2 border-gold-400/30 rounded-full flex justify-center group-hover:border-gold-400 transition-colors">
              <div className="w-1 h-3 bg-gold-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}