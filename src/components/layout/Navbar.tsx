import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Home, Sparkles, FolderGit2, User, Mail } from 'lucide-react'
import Dock from '../Dock'
import CardNav from '../CardNav'
import ProximityText from '../ProximityText'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showDock, setShowDock] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowDock(window.scrollY > window.innerHeight - 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const dockItems = [
    { icon: <Home size={20} />, label: 'Home', onClick: () => navigate('/') },
    { icon: <Sparkles size={20} />, label: 'Services', onClick: () => navigate('/services') },
    { icon: <FolderGit2 size={20} />, label: 'Portfolio', onClick: () => navigate('/portfolio') },
    { icon: <User size={20} />, label: 'About', onClick: () => navigate('/about') },
    { icon: <Mail size={20} />, label: 'Contact', onClick: () => navigate('/contact') },
  ]

  const cardNavItems = [
    {
      label: "Services",
      bgColor: "rgba(10, 10, 10, 0.8)",
      textColor: "#fff",
      links: [
        { label: "UI/UX Design", href: "/services", ariaLabel: "UI/UX Design" },
        { label: "Web Development", href: "/services", ariaLabel: "Web Development" },
        { label: "App Solutions", href: "/services", ariaLabel: "App Solutions" },
        { label: "Digital Strategy", href: "/services", ariaLabel: "Digital Strategy" },
        { label: "AI Integration", href: "/services", ariaLabel: "AI Integration" },
        { label: "Cyber Security", href: "/services", ariaLabel: "Cyber Security" }
      ]
    },
    {
      label: "Portfolio",
      bgColor: "rgba(10, 10, 10, 0.8)",
      textColor: "#fff",
      links: [
        { label: "Featured", href: "/portfolio", ariaLabel: "Featured Projects" },
        { label: "All Projects", href: "/portfolio", ariaLabel: "All Projects" }
      ]
    },
    {
      label: "Company",
      bgColor: "rgba(10, 10, 10, 0.8)",
      textColor: "#fff",
      links: [
        { label: "About", href: "/about", ariaLabel: "About Us" },
        { label: "Contact", href: "/contact", ariaLabel: "Contact Us" }
      ]
    }
  ];

  const isHomePage = location.pathname === '/'

  return (
    <>
      {/* Home Page Top Navbar (CardNav) */}
      <AnimatePresence>
        {!showDock && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-full z-50 pointer-events-none"
          >
            <div className="pointer-events-auto">
              <CardNav
                items={cardNavItems}
                baseColor="rgba(0, 0, 0, 0.6)"
                menuColor="#ffffff"
                buttonBgColor="rgba(0, 230, 168, 0.15)"
                buttonTextColor="#00E6A8"
                className="mt-4"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* Mobile Fullscreen Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 p-2 text-white/60 hover:text-[#00E6A8] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Mobile Links */}
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.href
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        text-4xl font-bold tracking-wide transition-all duration-300
                        ${isActive
                          ? 'text-[#00E6A8] drop-shadow-[0_0_12px_rgba(0,230,168,0.5)]'
                          : 'text-white/70 hover:text-white'
                        }
                      `}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 px-10 py-4 bg-black/40 backdrop-blur-md border border-[#00E6A8]/30 text-[#00E6A8] font-bold rounded-full text-xl
                    shadow-[0_0_30px_rgba(0,230,168,0.2)] hover:shadow-[0_0_40px_rgba(0,230,168,0.4)]
                    hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <ProximityText label="Get Started" className="text-xl" />
                </Link>
              </motion.div>
            </nav>

            {/* Decorative glow */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#00E6A8]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-[#00E6A8]/5 blur-[120px] rounded-full pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Dock Navigation */}
      <AnimatePresence>
        {showDock && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
          >
            <div className="pointer-events-auto">
              <Dock
                items={dockItems}
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
                distance={200}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
