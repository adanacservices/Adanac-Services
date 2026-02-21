import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight, Zap, ChevronRight } from 'lucide-react'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import CardSwap, { Card, CardContext } from '../components/CardSwap'
import ProximityText from '../components/ProximityText'
import { projects } from '../data/projects'

const PortfolioNextButton = () => {
  const { onNext } = useContext(CardContext);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onNext?.();
      }}
      className="hidden md:flex cursor-target bg-black/40 text-white border border-white/20 px-6 py-3 rounded-xl font-bold text-sm items-center gap-2 hover:bg-white/10 hover:border-white/40 transition-all transform active:scale-95 group/btn"
    >
      <ProximityText label="Next" />
      <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
    </button>
  );
};

export function Portfolio() {
  const [filter, setFilter] = useState('All')

  const filteredProjects = projects.filter(project => {
    if (filter === 'All') return true
    if (filter === 'Web') return project.category === 'Web Development'
    if (filter === 'App') return project.category === 'App Solutions'
    if (filter === 'AI') return project.category === 'AI Integration'
    if (filter === 'Security') return project.category === 'Cyber Security'
    if (filter === 'Strategy') return project.category === 'Digital Strategy'
    return true
  })

  return (
    <div className="relative pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-8">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-8xl font-display font-bold text-white mb-8"
            >
              <ProximityText label="The" /> <span className="text-primary italic"><ProximityText label="Portfolio" /></span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              <ProximityText label="Explore our latest tech projects showcasing digital innovation and excellence." />
            </motion.div>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-4">
            {['All', 'Web', 'App', 'AI', 'Security', 'Strategy'].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`cursor-target px-4 py-2 text-sm font-bold transition-colors border-b-2 ${filter === item
                  ? 'text-primary border-primary'
                  : 'text-white/50 border-transparent hover:text-primary hover:border-primary'
                  }`}
              >
                <ProximityText label={item} />
              </button>
            ))}
          </div>
        </div>

        {/* CardSwap Showcase */}
        <motion.div
          key={filter} // Force re-render on filter change
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center mt-24 mb-32"
        >
          <div className="relative w-full max-w-[600px] h-[400px] md:h-[500px] lg:h-[600px]">
            <CardSwap
              cardDistance={60}
              verticalDistance={60}
              delay={3500}
              pauseOnHover
              width={550}
              height={400}
            >
              {filteredProjects.map((project, i) => (
                <Card
                  key={project.id + i}
                  customClass="cursor-target group !border-white/15 !bg-black/90 overflow-hidden"
                >
                  {/* Background Image */}
                  <img
                    src={project.img}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-data-[expanded=true]:opacity-30 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-data-[expanded=true]:via-black/80" />

                  {/* Content Container */}
                  <div className="relative z-10 h-full p-8 flex flex-row gap-8">
                    {/* Left Side: Main Info */}
                    <div className="flex-1 flex flex-col justify-between h-full">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-4 max-w-[70%]">
                          {/* Expanded Content: Tech Stack Title */}
                          <div className="hidden group-data-[expanded=true]:block">
                            <h4 className="text-lg font-bold text-white flex items-center gap-2">
                              <Zap size={16} className="text-primary" />
                              <ProximityText label="Tech Stack" />
                            </h4>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] text-white border border-white/10 whitespace-nowrap">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-glow flex-shrink-0 group-data-[expanded=true]:hidden">
                          <ArrowUpRight className="text-black w-5 h-5" />
                        </div>
                      </div>

                      <div>
                        <span className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2 block">
                          <ProximityText label={project.category} />
                        </span>
                        <h3 className="text-3xl font-display font-bold text-white leading-tight">
                          <ProximityText label={project.title} />
                        </h3>
                      </div>
                    </div>

                    {/* Right Side: Details (Visible on Expand/Hover Context) */}
                    <div className="hidden group-data-[expanded=true]:flex flex-1 flex-col justify-center opacity-0 group-data-[expanded=true]:opacity-100 transition-all duration-500 delay-100">
                      <div className="mb-4">
                        <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2 md:hidden">
                          <Zap size={16} className="text-primary" /> <ProximityText label="Tech Stack" />
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.slice(0, 3).map(tech => (
                            <span key={tech} className="text-[10px] text-white/60 bg-white/5 border border-white/10 px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-6">
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {project.shortDescription}
                        </p>
                      </div>
                      <div className="mt-auto flex items-center gap-3">
                        <PortfolioNextButton />
                        <Link
                          to={`/project/${project.id}`}
                          className="cursor-target flex-1 bg-primary text-black px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#00FFAA] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ProximityText label="Details" /> <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
