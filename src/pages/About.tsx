import { motion } from 'framer-motion'
import { CheckCircle2, Award, Users, Target, Shield, Globe } from 'lucide-react'
import ProximityText from '../components/ProximityText'
import FlowingText from '../components/FlowingText'
import CountUp from '../components/CountUp'
import SpotlightCard from '../components/SpotlightCard'

const stats = [
  { label: 'Successful Projects', to: 120, suffix: '+' },
  { label: 'Happy Clients', to: 50, suffix: '+' },
  { label: 'Years of Experience', to: 5, suffix: '+' },
  { label: 'Digital Solutions', to: 300, suffix: '+' }
]

export function About() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-40">
          <FlowingText velocityScale={0.15} skewScale={0.1}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-8">
                <ProximityText label="Digital" /> <span className="text-primary italic"><ProximityText label="Pioneers" /></span>
              </h1>
              <div className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                <ProximityText label="We are a collective of visionaries, strategists, and creators. We don't just build websites; we craft digital ecosystems that redefine what's possible in the online space." />
              </div>
              <div className="flex space-x-6">
                <button
                  onClick={() => scrollToSection('our-story')}
                  className="cursor-target px-8 py-3 bg-primary text-black font-bold rounded-full shadow-glow hover:scale-105 transition-transform"
                >
                  <ProximityText label="Our Story" />
                </button>
              </div>
            </motion.div>
          </FlowingText>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[600px] rounded-[3rem] overflow-hidden border border-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070"
              alt="Team Meeting"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          </motion.div>
        </div>
      </div>

      <div id="stats" className="mb-40 border-y border-white/5 py-20 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <FlowingText velocityScale={0.1} skewScale={0.05}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-5xl md:text-7xl font-display font-bold text-white mb-2 flex items-baseline justify-center">
                    <CountUp
                      from={0}
                      to={stat.to}
                      duration={2}
                      separator=","
                      className="text-white"
                    />
                    <span className="text-primary ml-1">{stat.suffix}</span>
                  </div>
                  <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">
                    <ProximityText label={stat.label} />
                  </p>
                </div>
              ))}
            </div>
          </FlowingText>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              { icon: Target, title: 'Strategic Planning', desc: 'Every project starts with a roadmap focused on your core business objectives.' },
              { icon: Shield, title: 'Uncompromising Security', desc: 'We integrate high-level security into every layer of our digital solutions.' },
              { icon: Users, title: 'User-Centric Approach', desc: 'Designs that put humans first, ensuring intuitive experiences every time.' },
              { icon: Globe, title: 'Global Scalability', desc: 'Built to grow with your business, from local startups to global leaders.' }
            ].map((item, i) => (
              <SpotlightCard
                key={i}
                spotlightColor="rgba(0, 230, 168, 0.15)"
                className="cursor-target !p-8 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-primary/30 transition-all group"
              >
                <item.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-display font-bold text-white mb-4">
                  <ProximityText label={item.title} />
                </h4>
                <div className="text-muted-foreground text-sm leading-relaxed">
                  <ProximityText label={item.desc} />
                </div>
              </SpotlightCard>
            ))}
          </motion.div>
          <FlowingText velocityScale={0.15} skewScale={0.1}>
            <motion.div
              id="our-story"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-10 leading-tight">
                <ProximityText label="Why We" /> <span className="text-primary italic"><ProximityText label="Exist" /></span>
              </h2>
              <div className="text-xl text-muted-foreground leading-relaxed mb-8">
                <ProximityText label="Our mission is to empower businesses with technological solutions that are not only functional but also visually stunning. We believe in a future where high-performance meets high-design." />
              </div>
              <ul className="space-y-4">
                {['Innovation over repetition', 'Quality over quantity', 'Strategy over guesswork', 'Collaboration over hierarchy'].map((text, i) => (
                  <li key={i} className="flex items-center text-white font-bold group">
                    <CheckCircle2 className="w-6 h-6 text-primary mr-4 group-hover:scale-110 transition-transform" />
                    <ProximityText label={text} />
                  </li>
                ))}
              </ul>
            </motion.div>
          </FlowingText>
        </div>
      </div>
    </div>
  )
}
