import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Code, Rocket, Sparkles, BarChart, Shield, Cpu, X, ArrowRight, MessageSquare } from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'
import CircularGallery from '../components/CircularGallery'
import ProximityText from '../components/ProximityText'
import FlowingText from '../components/FlowingText'

const services = [
  {
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000',
    text: 'UI/UX Design',
    icon: Palette,
    bs_desc: 'Creating human-centric designs that prioritize user experience and brand identity.',
    description: 'We craft intuitive and visually stunning interfaces. Our design process isolates users pain points and delivers solutions that are both beautiful and functional. From wireframes to high-fidelity prototypes, we ensure every pixel serves a purpose.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
  },
  {
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070',
    text: 'Web Development',
    icon: Code,
    bs_desc: 'Building high-performance web applications using the latest frameworks.',
    description: 'Our engineering team builds robust, scalable, and secure web applications. We specialize in modern stacks like React, Next.js, and Node.js to deliver lightning-fast experiences that rank high on SEO and convert visitors.',
    features: ['Full Stack Dev', 'E-commerce', 'CMS Integration', 'Performance Optimization']
  },
  {
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070',
    text: 'App Solutions',
    icon: Rocket,
    bs_desc: 'Custom mobile and desktop applications designed to streamline business processes.',
    description: 'We develop cross-platform mobile and desktop applications that offer native performance. Whether it is iOS, Android, or Enterprise software, our solutions are designed to scale with your user base.',
    features: ['React Native', 'Flutter', 'iOS / Android', 'Cloud Sync']
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
    text: 'Digital Strategy',
    icon: BarChart,
    bs_desc: 'Data-driven strategies to help your brand grow and reach the right audience.',
    description: 'Stop guessing and start growing. We analyze market trends, competitor data, and user behavior to craft actionable digital strategies that drive measurable ROI.',
    features: ['SEO / SEM', 'Brand Positioning', 'Content Strategy', 'Analytics']
  },
  {
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070',
    text: 'AI Integration',
    icon: Cpu,
    bs_desc: 'Leveraging artificial intelligence to automate tasks and personalize experiences.',
    description: 'Future-proof your business with AI. We integrate machine learning models, chatbots, and automation workflows to reduce operational costs and enhance customer engagement.',
    features: ['LLM Integration', 'Chatbots', 'Predictive Analytics', 'Automation']
  },
  {
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070',
    text: 'ChatBots & AI Agents',
    icon: MessageSquare,
    bs_desc: 'Custom intelligent assistants and automated agents to scale your customer support and operations.',
    description: 'We build next-generation conversational AI that understands intent and context. From customer support bots to complex autonomous AI agents that handle workflows, our solutions are built on state-of-the-art LLMs to provide human-like interactions and efficiency.',
    features: ['Custom LLM Tuning', 'Multi-channel Deployment', 'Task Automation', 'Context Awareness']
  },
  {
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470',
    text: 'Cyber Security',
    icon: Shield,
    bs_desc: 'Protecting your digital assets with advanced security protocols.',
    description: 'Security is not an afterthought. We implement defense-in-depth strategies to secure your infrastructure, data, and users against evolving cyber threats.',
    features: ['Pen Testing', 'Audits', 'Encryption', 'Compliance']
  }
]

export function Services() {
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const location = useLocation()

  useEffect(() => {
    const state = location.state as { openServiceIndex?: number }
    if (state && typeof state.openServiceIndex === 'number') {
      setSelectedService(state.openServiceIndex)
      // Clear state after reading so it doesn't pop up again on refresh
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  const handleServiceClick = (index: number) => {
    // The gallery duplicate items for infinite scroll might return higher index
    // But our modified CircularGallery logic should handle modulus if we used length appropriately.
    // Let's safe guard it:
    const realIndex = index % services.length
    setSelectedService(realIndex)
  }

  return (
    <div className="flex flex-col w-full min-h-screen relative overflow-hidden bg-black">
      {/* Hero Section */}
      <div className="pt-32 pb-10 px-6 text-center relative z-10 pointer-events-none">
        <FlowingText velocityScale={0.15} skewScale={0.1}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display font-bold text-white mb-8"
          >
            Our <span className="text-primary italic">Expertise</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            <ProximityText label="Swipe to explore our services. Click to view details." />
          </motion.div>
        </FlowingText>
      </div>

      {/* Circular Gallery */}
      <div className="relative z-20 w-full h-[600px] md:h-[800px] flex items-center justify-center">
        <div className="w-full h-full">
          <CircularGallery
            items={services}
            bend={2}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.05}
            scrollSpeed={2.5}
            font="bold 40px 'Roboto Flex'"
            onItemClick={handleServiceClick}
          />
        </div>
      </div>

      {/* Expand Modal */}
      <AnimatePresence>
        {selectedService !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row relative shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-40 p-3 bg-black/60 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10 cursor-target backdrop-blur-md"
              >
                <X size={24} />
              </button>

              {/* Image Section */}
              <div className="md:w-1/2 min-h-[300px] md:min-h-0 relative overflow-hidden group">
                <img
                  src={services[selectedService].image}
                  alt={services[selectedService].text}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a0a0a]" />
              </div>

              {/* Content Section */}
              <div className="md:w-1/2 flex flex-col min-h-0 overflow-hidden">
                <div
                  className="flex-1 overflow-y-auto p-8 md:p-16 custom-scrollbar scroll-smooth"
                  data-lenis-prevent
                >
                  <div className="mb-8">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 border border-primary/20">
                      {(() => {
                        const Icon = services[selectedService].icon;
                        return <Icon size={28} />;
                      })()}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 leading-none">
                      <ProximityText label={services[selectedService].text} />
                    </h2>
                    <p className="text-xl text-primary italic font-medium leading-relaxed">
                      {services[selectedService].bs_desc}
                    </p>
                  </div>

                  <div className="prose prose-invert prose-lg mb-10 text-muted-foreground leading-relaxed">
                    <p>{services[selectedService].description}</p>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                    <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 opacity-60">Delivering Excellence via</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {services[selectedService].features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm font-medium text-white/90">
                          <Sparkles size={16} className="text-primary" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12 mb-4">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-black font-bold rounded-full shadow-[0_0_20px_rgba(0,230,168,0.4)] hover:shadow-[0_0_30px_rgba(0,230,168,0.6)] hover:scale-105 active:scale-95 transition-all text-lg group/btn cursor-target"
                      >
                        <ProximityText label="Book Free Consultation" />
                        <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
