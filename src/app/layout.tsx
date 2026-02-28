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
