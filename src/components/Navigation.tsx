'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navigation() {
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsScrolled(window.scrollY > 20);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/leads", label: "Premium Leads" },
    { href: "/pricing", label: "Pricing" },
    { href: "/testimonials", label: "Success Stories" },
    { href: "/support", label: "Support" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled 
          ? 'glass shadow-2xl shadow-navy-950/50' 
          : 'bg-navy-950/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold-500/25 group-hover:shadow-gold-500/50 transition-all duration-300">
                <span className="text-navy-950 font-bold text-lg">N</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
                Nxt<span className="text-gradient">Leads</span>
              </div>
              <div className="text-xs text-navy-400 font-medium">
                Premium • Exclusive • Guaranteed
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-navy-300 hover:text-gold-400 font-medium transition-all duration-300 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="btn-ghost relative z-10 text-white font-semibold"
                >
                  Elite Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="btn-secondary relative z-10"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-slate-300 hover:text-white font-medium px-4 py-2 rounded-lg hover:bg-slate-800/50 transition-all duration-300 relative z-10"
                >
                  Agent Login
                </Link>
                <Link
                  href="/apply"
                  className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-105 relative z-10"
                >
                  Apply for Elite Access
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-navy-300 hover:text-gold-400 transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1">
              <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}>
          <div className="glass-light rounded-2xl mt-4 p-6">
            <div className="flex flex-col gap-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-navy-300 hover:text-gold-400 font-medium transition-colors py-2"
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-navy-700">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="btn-ghost text-center"
                    >
                      Elite Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="btn-secondary text-center"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/signin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="btn-ghost text-center"
                    >
                      Agent Login
                    </Link>
                    <Link
                      href="/apply"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="btn-primary text-center"
                    >
                      Apply for Elite Access
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-300"
        style={{ width: isScrolled ? '100%' : '0%' }}
      ></div>
    </header>
  );
}