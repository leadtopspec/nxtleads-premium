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
        <body className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Nxt Leads</h1>
                <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  System Maintenance
                </h2>
                <p className="text-blue-100 text-lg mb-4">
                  We're currently upgrading our premium lead generation platform to serve you better.
                </p>
                <p className="text-blue-200 text-sm">
                  Expected back online: <strong>Shortly</strong>
                </p>
                <div className="mt-6 text-blue-300 text-sm">
                  Contact: support@nxtleads.org
                </div>
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
