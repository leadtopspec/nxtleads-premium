import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Premium Products",
      links: [
        { href: "/leads", label: "Exclusive Leads" },
        { href: "/pricing", label: "Pricing Plans" },
        { href: "/dashboard", label: "Agent Portal" },
        { href: "/success-manager", label: "Success Manager" },
      ],
    },
    {
      title: "Lead Types",
      links: [
        { href: "/leads?type=final-expense", label: "Final Expense" },
        { href: "/leads?type=iul", label: "IUL & Life Insurance" },
        { href: "/leads?type=annuity", label: "Annuities" },
        { href: "/leads?type=mortgage-protection", label: "Mortgage Protection" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "/knowledge-base", label: "Knowledge Base" },
        { href: "/training", label: "Elite Training" },
        { href: "/roi-calculator", label: "ROI Calculator" },
        { href: "/success-stories", label: "Success Stories" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "/contact", label: "Contact Us" },
        { href: "/support", label: "Help Center" },
        { href: "/waitlist", label: "Join Waitlist" },
        { href: "/status", label: "System Status" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About Nxt Leads" },
        { href: "/careers", label: "Careers" },
        { href: "/press", label: "Press Kit" },
        { href: "/partners", label: "Partners" },
      ],
    },
  ];

  const socialLinks = [
    {
      href: "https://twitter.com/NxtLeads",
      label: "Twitter",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
    },
    {
      href: "https://linkedin.com/company/nxtleads",
      label: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      href: "https://facebook.com/NxtLeads",
      label: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      href: "https://youtube.com/@NxtLeads",
      label: "YouTube",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ];

  const certifications = [
    "SOC 2 Type II Certified",
    "GDPR Compliant",
    "PCI DSS Level 1",
    "ISO 27001 Certified",
  ];

  return (
    <footer className="relative mt-24 bg-gradient-to-t from-navy-950 via-navy-900 to-navy-950">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-50"></div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid gap-12 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold-500/25">
                <span className="text-navy-950 font-bold text-xl">N</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  Nxt<span className="text-gradient">Leads</span>
                </div>
                <div className="text-sm text-navy-400 font-medium">
                  Premium • Exclusive • Guaranteed
                </div>
              </div>
            </Link>
            
            <p className="text-navy-300 mb-6 leading-relaxed">
              The world's most exclusive insurance lead platform. Trusted by 5000+ elite agents 
              generating 6+ figure incomes with our premium lead quality program.
            </p>

            {/* Elite Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass-light rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gold-400">5000+</div>
                <div className="text-xs text-navy-400">Elite Agents</div>
              </div>
              <div className="glass-light rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gold-400">15.2%</div>
                <div className="text-xs text-navy-400">Close Rate</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  className="w-10 h-10 rounded-lg glass-light flex items-center justify-center text-navy-400 hover:text-gold-400 hover:bg-gold-400/10 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-navy-400 hover:text-gold-400 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-12 border-t border-navy-800">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Elite Agent Intelligence Report
            </h3>
            <p className="text-navy-300 mb-6">
              Get exclusive market insights, lead generation strategies, and performance tips 
              delivered weekly. For elite agents only.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-navy-800/50 border border-navy-700 rounded-xl text-white placeholder-navy-500 focus:outline-none focus:border-gold-400 transition-colors"
              />
              <button className="btn-primary whitespace-nowrap">
                Join Elite
              </button>
            </div>
            
            <p className="text-xs text-navy-500 mt-3">
              No spam. Unsubscribe anytime. For qualified agents only.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-navy-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-navy-400 text-sm">
                © {currentYear} Nxt Leads. All rights reserved.
              </p>
              <p className="text-navy-500 text-xs mt-1">
                Elite agents deserve elite leads. Built with ❤️ for the industry leaders.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link href="/privacy" className="text-navy-400 hover:text-gold-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-navy-400 hover:text-gold-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/compliance" className="text-navy-400 hover:text-gold-400 transition-colors">
                Compliance
              </Link>
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap items-center gap-2">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1 bg-navy-800/50 border border-navy-700 rounded-full text-xs text-navy-400"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Elite Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-400/10 to-gold-600/10 border border-gold-400/20 rounded-full">
            <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
            <span className="text-gold-400 text-xs font-medium">
              Trusted by the industry's top 1% performers
            </span>
            <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}