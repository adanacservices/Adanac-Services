import { motion } from 'framer-motion'
import { ArrowRight, Code, Palette, Rocket, Sparkles, ArrowUpRight, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import FaultyTerminal from '../components/FaultyTerminal'
import VariableProximity from '../components/VariableProximity'
import BlurText from '../components/BlurText'
import { useRef } from 'react'
import GlitchText from '../components/GlitchText'
import CardSwap, { Card } from '../components/CardSwap'
import ElectricBorder from '../components/ElectricBorder'
import ScrollVelocity from '../components/ScrollVelocity'
import ProximityText from '../components/ProximityText'
import BounceCards from '../components/BounceCards'
import FlowingText from '../components/FlowingText'
import CountUp from '../components/CountUp'
import { projects } from '../data/projects'

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99] as any, // Cast to any to bypass type check for now
    },
  },
}

export function Home() {
  const containerRef = useRef(null);
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section with GridScan Background */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden bg-black">
        {/* GridScan Background */}
        <div className="absolute inset-0">
          <FaultyTerminal
            scale={1.4}
            gridMul={[2, 1]}
            digitSize={1.6}
            timeScale={0.5}
            pause={false}
            scanlineIntensity={0.5}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={0}
            dither={0}
            curvature={0.17}
            tint="#00ffaa"
            mouseReact
            mouseStrength={0.4}
            pageLoadAnimation
            brightness={0.7}
          />
        </div>

        {/* Hero Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto text-center z-10 relative"
        >
          <FlowingText velocityScale={0.2} skewScale={0.15}>
            <motion.div
              variants={fadeInUp}
              className="mb-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-0"
            >
              <GlitchText
                speed={0.8}
                enableShadows
                enableOnHover
                className="!text-6xl md:!text-9xl font-display !font-bold leading-[1.1] md:leading-[1.05]"
              >
                From
              </GlitchText>
              <GlitchText
                speed={0.6}
                enableShadows
                enableOnHover
                className="!text-6xl md:!text-9xl font-display !font-bold !text-[#00FFBF] italic leading-[1.1] md:leading-[1.05]"
              >
                Idea
              </GlitchText>
              <GlitchText
                speed={0.9}
                enableShadows
                enableOnHover
                className="!text-6xl md:!text-9xl font-display !font-bold leading-[1.1] md:leading-[1.05]"
              >
                to
              </GlitchText>
              <div className="relative">
                <GlitchText
                  speed={0.7}
                  enableShadows
                  enableOnHover
                  className="!text-6xl md:!text-9xl font-display !font-bold leading-[1.1] md:leading-[1.05]"
                >
                  Launch
                </GlitchText>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 1.2, ease: 'easeInOut' }}
                  className="absolute -bottom-2 left-0 h-2 bg-[#00FFBF]/50 shadow-[0_0_15px_rgba(0,255,191,0.4)]"
                />
              </div>
            </motion.div>
          </FlowingText>

          <FlowingText velocityScale={0.1} skewScale={0.05} className="flex justify-center">
            <motion.div
              variants={fadeInUp}
              className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-12 relative flex justify-center"
            >
              <div className="relative inline-block w-full text-center">
                <ProximityText
                  label="Web & App Solutions That Drive Your Business Forward. We create immersive digital experiences that captivate and convert."
                  className="text-lg md:text-2xl text-white/90 justify-center"
                />
              </div>
            </motion.div>
          </FlowingText>

          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link
              to="/contact"
              className="cursor-target px-8 py-4 bg-[#00E6A8] text-black font-bold rounded-full text-lg shadow-[0_0_25px_rgba(0,230,168,0.3)] hover:shadow-[0_0_35px_rgba(0,230,168,0.5)] hover:scale-105 active:scale-95 transition-all group flex items-center"
            >
              <ProximityText label="Start Your Project" className="text-lg" />
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/portfolio"
              className="cursor-target px-8 py-4 bg-black/40 backdrop-blur-md border border-white/10 text-white font-bold rounded-full text-lg hover:bg-white/10 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              <ProximityText label="View Portfolio" className="text-lg" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Glow Decor */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#00E6A8]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-[#00E6A8]/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Translucent Transition Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
      </section>


      {/* Services Highlight */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20">
            <FlowingText velocityScale={0.15} skewScale={0.1}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl"
              >
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                  <ProximityText label="Specialized in" className="text-4xl md:text-6xl" /> <span className="text-primary"><ProximityText label="Next-Gen" className="text-4xl md:text-6xl" /></span> <ProximityText label="Digital Solutions" className="text-4xl md:text-6xl" />
                </h2>
                <div className="text-muted-foreground text-lg">
                  <ProximityText label="We combine creative thinking with cutting-edge technology to deliver results that matter." className="text-lg text-muted-foreground" />
                </div>
              </motion.div>
            </FlowingText>
            <Link to="/services" className="cursor-target mt-8 md:mt-0 text-primary font-bold flex items-center group">
              <ProximityText label="Browse All Services" className="text-base" /> <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Palette, title: 'UI/UX Design', desc: 'Crafting intuitive and beautiful interfaces that users love to use.' },
              { icon: Code, title: 'Web Development', desc: 'High-performance, scalable websites built with the latest technologies.' },
              { icon: Rocket, title: 'App Solutions', desc: 'Full-stack mobile and web applications tailored to your business needs.' },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="cursor-target group relative rounded-2xl transition-all"
              >
                <ElectricBorder
                  color="#00E6A8"
                  speed={0.5}
                  chaos={0.1}
                  borderRadius={16}
                  className="h-full bg-black/60 backdrop-blur-sm"
                >
                  <div className="p-10 h-full flex flex-col items-start text-left">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full group-hover:bg-primary/10 transition-colors" />
                    <service.icon className="w-12 h-12 text-primary mb-8" />
                    <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                  </div>
                </ElectricBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll Velocity Section */}
      <section className="py-20 border-y border-white/5 overflow-hidden bg-black/50">
        <ScrollVelocity
          texts={['UI/UX Design ✦ Web Development ✦ App Solutions', 'Digital Strategy ✦ Creative Tech ✦ Cloud Infrastructure']}
          velocity={50}
          className="text-4xl md:text-6xl font-display font-bold text-white/10 hover:text-primary/20 transition-colors cursor-default"
        />
      </section>

      {/* Featured Portfolio Preview — CardSwap */}
      <section className="pt-32 pb-64 px-6 overflow-visible">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Left Side: Content */}
          <div className="flex-[1.2] flex flex-col items-center lg:items-start text-center lg:text-left space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                <ProximityText label="Featured" className="text-5xl md:text-7xl" /> <br />
                <span className="text-primary italic"><ProximityText label="Creatives" className="text-5xl md:text-7xl" /></span>
              </h2>
              <div className="text-muted-foreground text-xl max-w-sm mt-8 leading-relaxed">
                <ProximityText label="Explore our latest projects where design meets functionality in perfect harmony." className="text-xl text-muted-foreground" />
              </div>
            </motion.div>

            <Link
              to="/portfolio"
              className="cursor-target px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full text-lg hover:bg-white/10 transition-all flex items-center gap-3 group w-fit"
            >
              <ProximityText label="View All" className="text-lg" />
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Side: Cards */}
          <div className="flex-1 flex items-center justify-center lg:justify-start w-full lg:-translate-x-32">
            <div style={{ height: '750px', position: 'relative', width: '100%', maxWidth: '550px' }} className="lg:scale-100">
              <CardSwap
                cardDistance={70}
                verticalDistance={70}
                delay={4000}
                pauseOnHover
                width={500}
                height={370}
              >
                {projects.slice(0, 4).map((project, i) => (
                  <Card
                    key={i}
                    customClass="cursor-target group !border-white/15 !bg-black/90 overflow-hidden transition-all duration-500"
                  >
                    <img
                      src={project.img}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-50 group-data-[expanded=true]:opacity-30 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-data-[expanded=true]:via-black/80" />

                    <div className="relative z-10 h-full p-8 flex flex-row gap-8">
                      {/* Left Side: Main Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-end group-data-[expanded=true]:justify-start transition-all">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-glow">
                            <ArrowUpRight className="text-black w-5 h-5" />
                          </div>
                        </div>
                        <div>
                          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">
                            <ProximityText label={project.category} />
                          </span>
                          <h3 className="text-4xl font-display font-bold text-white group-data-[expanded=true]:text-5xl transition-all">
                            <ProximityText label={project.title} />
                          </h3>
                        </div>
                      </div>

                      {/* Right Side: Description (Visible on Expand) */}
                      <div className="hidden group-data-[expanded=true]:flex flex-1 flex-col justify-center opacity-0 group-data-[expanded=true]:opacity-100 transition-all duration-500 delay-100">
                        <h4 className="text-xl font-bold text-white mb-4 border-b border-primary/30 pb-2 inline-block w-fit">
                          <ProximityText label="Project Overview" />
                        </h4>
                        <div className="text-gray-300 text-sm leading-relaxed mb-6">
                          <ProximityText label={project.shortDescription} />
                        </div>
                        <div className="mb-6 flex flex-wrap gap-2">
                          {project.techStack.slice(0, 3).map(tech => (
                            <span key={tech} className="text-[10px] text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <Link
                          to={`/project/${project.id}`}
                          className="text-primary font-bold hover:underline flex items-center gap-2 cursor-target"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ProximityText label="Details" /> <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-32 px-6 bg-black/30 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center">
            {/* Header Content - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-24 text-center max-w-3xl"
            >
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">
                <ProximityText label="Why" /> <span className="text-primary italic"><ProximityText label="Choose" /></span> <ProximityText label="Adanac Services?" />
              </h2>
              <div className="text-muted-foreground text-xl leading-relaxed">
                <ProximityText label="We don't just build software; we engineer digital identities that resonate and scale with your vision. Every feature we craft is a pillar of your digital success." />
              </div>
            </motion.div>

            {/* Centered BounceCards Visual */}
            <div className="w-full flex justify-center items-center min-h-[600px] relative">
              <BounceCards
                className="max-sm:scale-[0.7] transform -translate-y-10"
                data={[
                  {
                    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
                    title: "Strategic Innovation",
                    desc: "We merge business strategy with creative tech to build solutions that solve real-world problems.",
                    icon: Rocket
                  },
                  {
                    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
                    title: "Premium Aesthetics",
                    desc: "Bespoke designs that prioritize user experience while maintaining a high-end, premium visual language.",
                    icon: Palette
                  },
                  {
                    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop",
                    title: "Modern Tech Stack",
                    desc: "Using the latest in AI, cloud, and web technologies to ensure your project is future-proof and fast.",
                    icon: Code
                  },
                  {
                    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
                    title: "Dedicated Support",
                    desc: "We are your long-term partners, providing ongoing optimization and support to ensure sustained growth.",
                    icon: Sparkles
                  },
                  {
                    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
                    title: "Adanac Edge",
                    desc: "Experience the perfect blend of performance, security, and next-gen design.",
                    icon: Zap
                  }
                ]}
                containerWidth={1200}
                containerHeight={500}
                animationDelay={0.5}
                animationStagger={0.08}
                enableHover
                transformStyles={[
                  "rotate(0deg) translate(-450px, 0px)",
                  "rotate(0deg) translate(-225px, 0px)",
                  "rotate(0deg) translate(0px, 0px)",
                  "rotate(0deg) translate(225px, 0px)",
                  "rotate(0deg) translate(450px, 0px)"
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 bg-black/40 backdrop-blur-md border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <FlowingText velocityScale={0.08} skewScale={0.04}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { to: 120, label: 'SUCCESSFUL PROJECTS', suffix: '+' },
                { to: 50, label: 'HAPPY CLIENTS', suffix: '+' },
                { to: 5, label: 'YEARS OF EXPERIENCE', suffix: '+' },
                { to: 300, label: 'DIGITAL SOLUTIONS', suffix: '+' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
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
                  <div className="text-xs md:text-sm font-bold tracking-[0.2em] text-muted-foreground uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FlowingText>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-black/40 backdrop-blur-sm border border-white/10 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

          <FlowingText velocityScale={0.15} skewScale={0.1}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-10 relative z-10 leading-tight">
                <ProximityText label="Ready to" className="text-4xl md:text-7xl" /> <span className="text-primary italic"><ProximityText label="Transform" className="text-4xl md:text-7xl" /></span> <ProximityText label="Your Business?" className="text-4xl md:text-7xl" />
              </h2>
              <div className="text-xl text-muted-foreground mb-12 relative z-10 max-w-2xl mx-auto">
                <ProximityText label="Join forces with a digital agency that prioritizes innovation, performance, and beautiful design." className="text-xl text-muted-foreground" />
              </div>
            </motion.div>
          </FlowingText>
          <Link
            to="/contact"
            className="cursor-target inline-flex px-12 py-5 bg-primary text-black font-bold rounded-full text-2xl relative z-10 shadow-glow hover:scale-110 active:scale-95 transition-all"
          >
            <ProximityText label="Let's Talk" className="text-2xl font-bold" />
          </Link>
        </div>
      </section>
    </div>
  )
}
