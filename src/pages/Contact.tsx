import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Phone, ArrowRight, Instagram, Twitter, Linkedin, Github } from 'lucide-react'
import { useState } from 'react'
import ProximityText from '../components/ProximityText'

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Use your Google Apps Script Web App URL here
      // You can also use an environment variable: (import.meta as any).env.VITE_CONTACT_FORM_ENDPOINT
      const scriptURL = (import.meta as any).env.VITE_CONTACT_FORM_ENDPOINT || '#'

      if (scriptURL === '#') {
        console.warn('Contact form endpoint is not configured. Submission simulated.')
        await new Promise(resolve => setTimeout(resolve, 1500))
      } else {
        await fetch(scriptURL, {
          method: 'POST',
          mode: 'no-cors', // Add this for Google Apps Script
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            type: 'contact',
            timestamp: new Date().toISOString()
          })
        })
      }

      setIsSuccess(true)
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' })
    } catch (error) {
      console.error('Submission error:', error)
      alert('Something went wrong. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-40">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-10">
              <ProximityText label="Get in" /> <span className="text-primary italic"><ProximityText label="Touch" /></span>
            </h1>
            <div className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-lg">
              <ProximityText label="Have a project in mind? We'd love to hear from you. Let's create something extraordinary together." />
            </div>

            <div className="space-y-10">
              {[
                { icon: Mail, label: 'Email', value: 'servicesadanac@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+91 70785 42863 / +91 92351 32023' },
                { icon: MapPin, label: 'Location', value: 'Remote & Delhi, India' }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-6 group">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-glow">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold mb-1">
                      <ProximityText label={item.label} />
                    </p>
                    <p className="text-xl font-display font-bold text-white transition-colors group-hover:text-primary">
                      <ProximityText label={item.value} />
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20">
              <h4 className="text-white font-display font-bold mb-8 uppercase tracking-widest text-sm">
                <ProximityText label="Follow Us" />
              </h4>
              <div className="flex space-x-6">
                {[
                  { Icon: Instagram, href: 'https://www.instagram.com/adanacservices' },
                  { Icon: Twitter, href: '#' },
                  { Icon: Github, href: '#' }
                ].map(({ Icon, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-target w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-colors hover:border-primary/50 hover:text-primary shadow-glow"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-[3rem] p-10 md:p-14 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-display font-bold text-white mb-4">
                  <ProximityText label="Message Sent!" />
                </h3>
                <div className="text-muted-foreground mb-10">
                  <ProximityText label="Thank you for reaching out. We'll get back to you within 24 hours." />
                </div>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="cursor-target px-8 py-3 bg-primary text-black font-bold rounded-full shadow-glow"
                >
                  <ProximityText label="Send Another" />
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white uppercase tracking-widest ml-1">
                      <ProximityText label="Name" />
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white uppercase tracking-widest ml-1">
                      <ProximityText label="Email" />
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-widest ml-1">
                    <ProximityText label="Subject" />
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                  >
                    <option className="bg-black">General Inquiry</option>
                    <option className="bg-black">Project Discussion</option>
                    <option className="bg-black">Partnership</option>
                    <option className="bg-black">Careers</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-widest ml-1">
                    <ProximityText label="Message" />
                  </label>
                  <textarea
                    required
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>

                <button
                  disabled={isSubmitting}
                  className="cursor-target w-full py-5 bg-primary text-black font-bold rounded-2xl text-xl shadow-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ProximityText label={isSubmitting ? 'Sending...' : 'Send Message'} />
                  {!isSubmitting && <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        <div className="relative h-[600px] rounded-[3rem] overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-primary/5 z-10 pointer-events-none" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.8398402456!2d77.06889754117036!3d28.527280340775836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sca"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.5) contrast(1.2)' }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
