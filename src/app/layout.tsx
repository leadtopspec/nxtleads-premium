import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import FacebookPixel from "@/components/FacebookPixel";
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nxt Leads - Exclusive Insurance Leads | Premium Quality Guaranteed",
  description: "Premium, exclusive insurance leads that convert at 15% vs industry 2-3%. $25-30 per verified lead with quality guarantee. Join 5000+ elite agents earning 6-figures+.",
  keywords: [
    "exclusive insurance leads",
    "premium insurance leads", 
    "high converting leads",
    "insurance agent leads",
    "life insurance leads",
    "final expense leads",
    "IUL leads",
    "annuity leads",
    "guaranteed ROI",
    "elite insurance agents"
  ],
  authors: [{ name: "Nxt Leads" }],
  creator: "Nxt Leads",
  publisher: "Nxt Leads",
  metadataBase: new URL("https://nxtleads.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Nxt Leads",
    title: "Nxt Leads - Exclusive Insurance Leads | Premium Quality Guaranteed",
    description: "Premium, exclusive insurance leads that convert at 15% vs industry 2-3%. Join elite agents earning 6-figures+ with our guaranteed ROI program.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nxt Leads - Premium Insurance Leads",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@NxtLeads",
    creator: "@NxtLeads",
    title: "Nxt Leads - Exclusive Insurance Leads | Premium Quality Guaranteed",
    description: "Premium, exclusive insurance leads that convert at 15% vs industry 2-3%. Join elite agents earning 6-figures+.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0f172a" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Simple maintenance mode - change this to 'true' to enable maintenance
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE === 'true'
  
  if (maintenanceMode) {
    return (
      <html lang="en">
        <body className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] opacity-5" 
                 style={{backgroundSize: '40px 40px'}}></div>
            
            <div className="max-w-2xl mx-auto text-center relative z-10">
              {/* Elite Branding */}
              <div className="mb-12">
                <div className="flex items-center justify-center mb-6">
                  <svg className="w-16 h-16 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L3 9v10c0 5.55 3.84 9.37 9 10 5.16-.63 9-4.45 9-10V9l-9-7z"/>
                  </svg>
                </div>
                <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
                  Nxt Leads
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto mb-3"></div>
                <p className="text-slate-300 text-lg font-medium">
                  Premium Lead Generation Platform
                </p>
              </div>

              {/* Elite Maintenance Card */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-12 border border-white/10 shadow-2xl">
                {/* Status Icon */}
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-slate-900 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-6">
                  Elite System Enhancement
                </h2>
                
                <p className="text-slate-300 text-xl mb-8 leading-relaxed">
                  We're upgrading our premium lead generation infrastructure to deliver even higher quality prospects to our elite agents.
                </p>
                
                {/* Enhancement Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <div className="text-emerald-400 text-lg font-semibold mb-2">Quality Enhancement</div>
                    <div className="text-slate-300 text-sm">Upgrading AI scoring algorithms for 20%+ close rates</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <div className="text-blue-400 text-lg font-semibold mb-2">Speed Optimization</div>
                    <div className="text-slate-300 text-sm">Reducing lead delivery to under 5 minutes</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-xl p-6 mb-8 border border-yellow-400/20">
                  <p className="text-yellow-200 font-medium text-lg">
                    🚀 Expected online: <span className="text-white font-bold">Shortly</span>
                  </p>
                  <p className="text-yellow-300/80 text-sm mt-2">
                    Your elite agent dashboard will be even more powerful
                  </p>
                </div>

                {/* Elite Contact */}
                <div className="border-t border-slate-700/50 pt-8">
                  <p className="text-slate-400 text-sm mb-4">
                    Elite Agent Support & Urgent Inquiries
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                    <div className="text-slate-300">
                      <span className="text-yellow-400 font-medium">Email:</span> support@nxtleads.org
                    </div>
                    <div className="hidden sm:block text-slate-600">|</div>
                    <div className="text-slate-300">
                      <span className="text-yellow-400 font-medium">Status:</span> Upgrading lead quality systems
                    </div>
                  </div>
                </div>
              </div>

              {/* Elite Footer */}
              <div className="mt-12 text-center">
                <p className="text-slate-400 text-sm leading-relaxed">
                  Thank you for choosing <span className="text-white font-semibold">Nxt Leads</span><br />
                  <span className="text-yellow-400">The Premium Choice for Elite Insurance Agents</span>
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    )
  }
  
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Fonts are automatically preloaded by Next.js */}
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Nxt Leads",
              url: "https://nxtleads.com",
              logo: "https://nxtleads.com/logo.png",
              description: "Premium exclusive insurance leads for elite agents",
              sameAs: [
                "https://twitter.com/NxtLeads",
                "https://linkedin.com/company/nxtleads",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-800-NXT-LEADS",
                contactType: "customer service",
                areaServed: "US",
                availableLanguage: "English",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfairDisplay.variable} antialiased`}
      >
        <AuthProvider>
          <FacebookPixel />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
