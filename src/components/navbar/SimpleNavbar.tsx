'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface NavLink {
  label: string
  href: string
}

interface SimpleNavbarProps {
  businessName: string
  logo?: string
  links: NavLink[]
  ctaText?: string
  ctaLink?: string
  phone?: string
}

export default function SimpleNavbar({
  businessName,
  logo,
  links,
  ctaText = "Book a Call",
  ctaLink = "#contact",
  phone,
}: SimpleNavbarProps) {
  const [activeLink, setActiveLink] = useState(links[0]?.href || '')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <div className="max-w-7xl mx-auto px-6 py-4 bg-slate-900/95 backdrop-blur-md rounded-full border border-slate-700/50 shadow-lg shadow-black/20">
          <div className="flex items-center justify-between">
            {/* Logo / Business Name */}
            <a href="/" className="flex items-center gap-2">
              {logo ? (
                <img src={logo} alt={businessName} className="h-8" />
              ) : (
                <span className="text-xl font-bold text-white">{businessName}</span>
              )}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className="relative px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  {link.label}
                  {/* Underline indicator */}
                  {activeLink === link.href && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-white rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              {phone && (
                <a href={`tel:${phone}`} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                  {phone}
                </a>
              )}
              <motion.a
                href={ctaLink}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 bg-white text-slate-900 text-sm font-semibold rounded-full hover:bg-slate-100 transition-colors"
              >
                {ctaText}
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden mx-4 mt-2"
        >
          <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-lg p-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.href)
                  setMobileMenuOpen(false)
                }}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeLink === link.href
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-slate-700">
              <a
                href={ctaLink}
                className="block w-full text-center px-5 py-3 bg-white text-slate-900 text-sm font-semibold rounded-full hover:bg-slate-100 transition-colors"
              >
                {ctaText}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
