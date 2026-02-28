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
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Nxt Leads - System Maintenance</title>
        </head>
        <body style={{
          margin: 0,
          padding: 0,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          minHeight: '100vh',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: 'white'
        }}>
          <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              maxWidth: '600px',
              width: '100%',
              textAlign: 'center'
            }}>
              {/* Logo */}
              <div style={{ marginBottom: '40px' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '24px'
                }}>
                  👑
                </div>
                <h1 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  margin: '0 0 10px',
                  letterSpacing: '-1px'
                }}>
                  Nxt Leads
                </h1>
                <div style={{
                  width: '80px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
                  margin: '0 auto 15px'
                }}></div>
                <p style={{
                  fontSize: '16px',
                  margin: 0,
                  color: '#cbd5e1'
                }}>
                  Premium Lead Generation Platform
                </p>
              </div>

              {/* Main Card */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '40px 30px',
                backdropFilter: 'blur(10px)'
              }}>
                {/* Spinning Icon */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 30px',
                  fontSize: '24px',
                  animation: 'spin 2s linear infinite'
                }}>
                  ⚙️
                </div>
                
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  margin: '0 0 20px',
                  color: 'white'
                }}>
                  Elite System Enhancement
                </h2>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#cbd5e1',
                  margin: '0 0 30px'
                }}>
                  We're upgrading our premium lead generation infrastructure to deliver even higher quality prospects to our elite agents.
                </p>
                
                {/* Status */}
                <div style={{
                  background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1))',
                  border: '1px solid rgba(251, 191, 36, 0.2)',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '30px'
                }}>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    margin: '0 0 8px',
                    color: '#fde68a'
                  }}>
                    🚀 Expected online: <strong style={{ color: 'white' }}>Shortly</strong>
                  </p>
                  <p style={{
                    fontSize: '14px',
                    margin: 0,
                    color: '#fde68a',
                    opacity: 0.8
                  }}>
                    Your elite agent dashboard will be even more powerful
                  </p>
                </div>

                {/* Contact */}
                <div style={{
                  borderTop: '1px solid rgba(148, 163, 184, 0.3)',
                  paddingTop: '20px'
                }}>
                  <p style={{
                    fontSize: '14px',
                    margin: '0 0 15px',
                    color: '#94a3b8'
                  }}>
                    Elite Agent Support & Urgent Inquiries
                  </p>
                  <p style={{
                    fontSize: '14px',
                    margin: 0,
                    color: '#cbd5e1'
                  }}>
                    <span style={{ color: '#fbbf24', fontWeight: '500' }}>Email:</span> support@nxtleads.org<br />
                    <span style={{ color: '#fbbf24', fontWeight: '500' }}>Status:</span> Upgrading lead quality systems
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div style={{ marginTop: '40px' }}>
                <p style={{
                  fontSize: '14px',
                  margin: 0,
                  color: '#94a3b8',
                  lineHeight: '1.5'
                }}>
                  Thank you for choosing <span style={{ color: 'white', fontWeight: '600' }}>Nxt Leads</span><br />
                  <span style={{ color: '#fbbf24' }}>The Premium Choice for Elite Insurance Agents</span>
                </p>
              </div>
            </div>
          </div>
          
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `
          }} />
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
