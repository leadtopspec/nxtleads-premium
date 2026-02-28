'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    fbq: any;
  }
}

export default function FacebookPixel() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Facebook Pixel
    if (typeof window !== 'undefined') {
      // Facebook Pixel Code
      (function(f: any, b: any, e: any, v: any) {
        let n: any, t: any, s: any;
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      // Initialize the pixel
      window.fbq('init', process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || 'YOUR_PIXEL_ID');
      
      // Track initial page view
      window.fbq('track', 'PageView');

      // Set up enhanced tracking
      window.fbq('track', 'ViewContent', {
        content_type: 'website',
        content_name: document.title,
        content_category: 'Insurance Leads'
      });
    }
  }, []);

  useEffect(() => {
    // Track page views on route changes
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
      
      // Track specific page types
      if (pathname.includes('facebook-lead-')) {
        const leadType = pathname.split('facebook-lead-')[1];
        window.fbq('track', 'InitiateCheckout', {
          content_type: 'lead_form',
          content_category: leadType.replace('-', ' '),
          currency: 'USD',
          value: 29.99
        });
      }
      
      if (pathname === '/leads') {
        window.fbq('track', 'Search', {
          content_type: 'lead_marketplace',
          search_string: 'insurance leads'
        });
      }
      
      if (pathname === '/dashboard') {
        window.fbq('track', 'ViewContent', {
          content_type: 'dashboard',
          content_category: 'user_dashboard'
        });
      }
    }
  }, [pathname]);

  return (
    <>
      {/* Facebook Pixel noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || 'YOUR_PIXEL_ID'}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

// Helper functions for tracking specific events
export const trackLeadSubmission = (leadType: string, value: number = 29.99) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_category: leadType,
      value: value,
      currency: 'USD',
      content_type: 'lead_form'
    });
    
    // Also track as a conversion
    window.fbq('track', 'CompleteRegistration', {
      content_name: `${leadType} Lead Form`,
      value: value,
      currency: 'USD'
    });
  }
};

export const trackLeadPurchase = (leadId: string, price: number, leadType: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', {
      value: price,
      currency: 'USD',
      content_ids: [leadId],
      content_type: 'lead',
      content_category: leadType
    });
  }
};

export const trackSignUp = (method: string = 'email') => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'CompleteRegistration', {
      content_name: 'User Registration',
      status: 'completed',
      method: method
    });
  }
};

export const trackLogin = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Login', {
      content_category: 'authentication'
    });
  }
};

export const trackAddToCart = (leadId: string, price: number, leadType: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_ids: [leadId],
      content_type: 'lead',
      content_category: leadType,
      value: price,
      currency: 'USD'
    });
  }
};