import React from 'react';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "About EcoFinds",
      links: [
        { name: "Our Story", href: "#" },
        { name: "Mission & Vision", href: "#" },
        { name: "Sustainability", href: "#" },
        { name: "Community", href: "#" },
        { name: "Careers", href: "#" }
      ]
    },
    {
      title: "For Buyers",
      links: [
        { name: "How to Buy", href: "#" },
        { name: "Safety Tips", href: "#" },
        { name: "Payment Methods", href: "#" },
        { name: "Buyer Protection", href: "#" },
        { name: "Help Center", href: "#" }
      ]
    },
    {
      title: "For Sellers",
      links: [
        { name: "Start Selling", href: "#" },
        { name: "Seller Guidelines", href: "#" },
        { name: "Pricing Tips", href: "#" },
        { name: "Seller Support", href: "#" },
        { name: "Success Stories", href: "#" }
      ]
    },
    {
      title: "Categories",
      links: [
        { name: "Electronics", href: "#" },
        { name: "Furniture", href: "#" },
        { name: "Fashion", href: "#" },
        { name: "Sports & Books", href: "#" },
        { name: "Bikes", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: "Twitter",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: "Instagram",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297L6.548 14.264c.515.642 1.297 1.058 2.183 1.058c1.564 0 2.832-1.297 2.832-2.832c0-1.564-1.297-2.832-2.832-2.832c-.886 0-1.668.416-2.183 1.058L4.121 9.289c.88-.807 2.031-1.297 3.328-1.297c2.727 0 4.942 2.215 4.942 4.942S11.176 16.988 8.449 16.988z"/>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-gray-900 text-white rounded-t-4xl">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-[#782355] mb-4">EcoFinds</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted marketplace for sustainable and eco-friendly products. 
              Join our community in making a positive impact on the environment 
              while finding amazing deals.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPinIcon className="h-5 w-5 mr-3 text-[#782355]" />
                <span className="text-sm">123 Eco Street, Green City, IN 12345</span>
              </div>
              <div className="flex items-center text-gray-300">
                <PhoneIcon className="h-5 w-5 mr-3 text-[#782355]" />
                <span className="text-sm">+91 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <EnvelopeIcon className="h-5 w-5 mr-3 text-[#782355]" />
                <span className="text-sm">support@ecofinds.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-[#782355] transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-300">
                Subscribe to our newsletter for the latest eco-friendly products and sustainable living tips.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-[#782355] focus:ring-1 focus:ring-[#782355] text-white placeholder-gray-400"
              />
              <button className="bg-[#782355] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8e2a63] transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Links & Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">Follow us:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-[#782355] transition-colors duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm flex items-center justify-center md:justify-end">
                © {currentYear} EcoFinds. Made with 
                <HeartIcon className="h-4 w-4 mx-1 text-red-500" />
                for a sustainable future.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[#782355] transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#782355] transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#782355] transition-colors duration-200">
              Cookie Policy
            </a>
            <a href="#" className="hover:text-[#782355] transition-colors duration-200">
              Refund Policy
            </a>
            <a href="#" className="hover:text-[#782355] transition-colors duration-200">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
