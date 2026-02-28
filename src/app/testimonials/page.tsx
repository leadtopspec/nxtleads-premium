'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { eliteTestimonials } from "@/components/EliteTestimonials";

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950">
      <Navigation />
      
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-heading-1 text-white mb-6">
              Elite Agent <span className="text-gradient">Success Stories</span>
            </h1>
            <p className="text-body-lg text-navy-300 max-w-3xl mx-auto">
              Real results from real agents who transformed their business with Nxt Leads.
              Join the ranks of elite performers earning 6+ figures annually.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {eliteTestimonials.map((testimonial, index) => (
              <div key={index} className="card-premium text-center">
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-gold-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <blockquote className="text-navy-200 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="border-t border-navy-700 pt-6">
                  <div className="font-semibold text-white mb-1">{testimonial.name}</div>
                  <div className="text-gold-400 text-sm font-medium mb-2">{testimonial.title}</div>
                  <div className="text-navy-400 text-sm">{testimonial.company}</div>
                </div>
                
                {testimonial.metrics && (
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-navy-800/30 rounded-lg p-3">
                      <div className="text-gold-400 font-bold text-lg">{testimonial.metrics.value}</div>
                      <div className="text-navy-400 text-xs">{testimonial.metrics.label}</div>
                    </div>
                    <div className="bg-navy-800/30 rounded-lg p-3">
                      <div className="text-gold-400 font-bold text-lg">{testimonial.metrics.improvement}</div>
                      <div className="text-navy-400 text-xs">Improvement</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}