import { Instagram, Linkedin, Mail, MessageCircle, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import ProximityText from '../ProximityText'
import TimeDisplay from '../TimeDisplay'

export function Footer() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    try {
      const scriptURL = (import.meta as any).env.VITE_CONTACT_FORM_ENDPOINT
      if (scriptURL) {
        await fetch(scriptURL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'newsletter',
            email: email,
            timestamp: new Date().toISOString()
          })
        })
      }
      setIsSubscribed(true)
      setEmail('')
    } catch (error) {
      console.error('Newsletter error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="relative z-50 bg-black pt-32 pb-10 overflow-hidden px-6 md:px-12">
      <div className="absolute inset-0 bg-mesh opacity-5 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.8fr_1.2fr] gap-12 lg:gap-16 items-start">

        {/* Left Side: Logo & Info */}
        <div className="flex flex-col flex-1 space-y-12">
          <div className="pt-0">
            <img
              src="/LOGOfooter(2).png"
              alt="Adanac Services"
              className="h-24 md:h-28 w-auto object-contain brightness-90 contrast-110 mb-8"
            />
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Email</p>
              <div className="text-white font-medium text-lg"><ProximityText label="servicesadanac@gmail.com" /></div>
            </div>

            <div className="space-y-2">
              <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Phone</p>
              <div className="text-white font-medium text-lg block"><ProximityText label="+91 92351 32023" /></div>
              <div className="text-white font-medium text-lg block"><ProximityText label="+91 70785 42863" /></div>
            </div>

            <div className="space-y-2">
              <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Location</p>
              <div className="text-white font-medium text-lg"><ProximityText label="Remote & Delhi, India" /></div>
            </div>
          </div>
        </div>

        {/* Middle Side: Newsletter */}
        <div className="flex flex-col flex-[2] justify-center items-center lg:items-start space-y-10 py-10 lg:py-0 border-y lg:border-y-0 lg:border-x border-white/5 px-0 lg:px-12">
          <div className="space-y-4 text-center lg:text-left w-full">
            <h4 className="text-white text-3xl font-bold font-display uppercase tracking-widest leading-tight">
              <ProximityText label="Join Our" /> <br />
              <span className="text-primary italic"><ProximityText label="Intelligence" /></span>
            </h4>
            <p className="text-muted-foreground text-sm max-w-md">
              Stay ahead with curated insights on AI, design, and growth. Delivered directly to your digital workspace.
            </p>
          </div>

          <div className="relative w-full max-w-2xl">
            <form className="relative w-full group overflow-hidden rounded-2xl" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscribed}
                placeholder="Enter your email address..."
                className={`w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-6 text-white text-base outline-none transition-all group-hover:border-white/20 shadow-[inset_0_1px_10px_rgba(255,255,255,0.02)] ${isSubscribed ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
              />
              <motion.button
                type="submit"
                layout
                initial={false}
                animate={{
                  left: isSubscribed ? "0px" : "auto",
                  right: isSubscribed ? "0px" : "10px",
                  top: isSubscribed ? "0px" : "10px",
                  bottom: isSubscribed ? "0px" : "10px",
                  borderRadius: isSubscribed ? "16px" : "12px",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                className={`cursor-target absolute bg-primary text-black font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(0,230,168,0.4)] z-20 ${isSubscribed ? 'px-0 h-full w-full pointer-events-none' : 'px-10'}`}
              >
                <AnimatePresence mode="wait">
                  {isSubscribed ? (
                    <motion.div
                      key="checked"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 uppercase tracking-[0.2em] font-black text-sm"
                    >
                      <Check size={20} strokeWidth={4} />
                      <ProximityText label="Subscribed" />
                    </motion.div>
                  ) : (
                    <motion.span
                      key="subscribe"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-bold"
                    >
                      <ProximityText label="Subscribe" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-muted-foreground opacity-50">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <ProximityText label="Zero spam. High signal only." />
          </div>
        </div>

        {/* Right Side: Links & Clock */}
        <div className="flex flex-col items-end flex-1 space-y-12">
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-12 md:gap-20 text-sm text-right">
            {/* Services Column */}
            <div className="space-y-6 text-left shrink-0">
              <h4 className="text-muted-foreground font-medium mb-4"><ProximityText label="Services" /></h4>
              <ul className="space-y-3">
                {[
                  { label: 'AI Integration', href: '/services', index: 4 },
                  { label: 'Web Development', href: '/services', index: 1 },
                  { label: 'App Solutions', href: '/services', index: 2 },
                  { label: 'ChatBots & AI Agents', href: '/services', index: 5 },
                  { label: 'Cyber Security Solutions', href: '/services', index: 6 },
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.href}
                      state={{ openServiceIndex: item.index }}
                      className="cursor-target text-white hover:text-primary transition-colors block py-0.5"
                    >
                      <ProximityText label={item.label} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Column (Formerly Resources) */}
            <div className="space-y-8 text-left shrink-0">
              <div className="space-y-4">
                <h4 className="text-muted-foreground font-medium mb-4"><ProximityText label="Connect" /></h4>
                <Link
                  to="/contact"
                  className="cursor-target inline-block bg-black/40 backdrop-blur-md border border-primary/30 text-primary hover:bg-primary hover:text-black px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-[0_0_15px_rgba(0,230,168,0.1)] hover:shadow-[0_0_25px_rgba(0,230,168,0.3)] hover:scale-105"
                >
                  <ProximityText label="Contact Us" />
                </Link>
              </div>

              <div className="flex flex-nowrap gap-3">
                {[
                  { icon: Instagram, href: 'https://www.instagram.com/adanacservices', label: 'Instagram' },
                  { icon: Mail, href: 'mailto:servicesadanac@gmail.com', label: 'Email' },
                  { icon: MessageCircle, href: 'https://wa.me/917078542863', label: 'WhatsApp' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-4 min-h-[120px] lg:min-h-[160px] flex items-end">
            <TimeDisplay />
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground space-y-4 md:space-y-0">
        <div><ProximityText label={`Adanac Services © ${new Date().getFullYear()}. All rights reserved.`} /></div>
        <div className="flex space-x-8 opacity-60 hover:opacity-100 transition-opacity">
          {/* Can add small links here if needed */}
        </div>
      </div>
    </footer >
  )
}
