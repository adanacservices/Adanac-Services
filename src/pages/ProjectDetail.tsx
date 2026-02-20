import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, User, Briefcase, Zap, CheckCircle2 } from 'lucide-react';
import { projects } from '../data/projects';
import ProximityText from '../components/ProximityText';
import { useEffect } from 'react';

const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const project = projects.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <Link to="/portfolio" className="text-primary hover:underline">Return to Portfolio</Link>
                </div>
            </div>
        );
    }

    const fadeInUp: any = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-white pb-20">
            {/* Hero Section */}
            <section className="relative h-[70vh] w-full overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.6 }}
                    transition={{ duration: 1.5 }}
                    src={project.img}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-32 backdrop-blur-[4px] pointer-events-none" />

                <div className="absolute inset-0 flex flex-col justify-end px-6 pb-20 max-w-7xl mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-primary font-bold mb-8 hover:gap-3 transition-all cursor-target"
                        >
                            <ArrowLeft size={20} /> <ProximityText label="Back to Portfolio" />
                        </button>
                        <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
                            <ProximityText label={project.category} />
                        </span>
                        <h1 className="text-6xl md:text-8xl font-display font-bold mb-6">
                            <ProximityText label={project.title} />
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-7xl mx-auto px-6 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Project Info Sidebar */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-1 space-y-12"
                    >
                        <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm shadow-glow">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Zap className="text-primary" size={20} /> <ProximityText label="Project Info" />
                            </h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                                        <User size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">Client</p>
                                        <p className="font-medium">{project.client || 'Internal Project'}</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                                        <Calendar size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">Year</p>
                                        <p className="font-medium">{project.year || '2024'}</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                                        <Briefcase size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">Role</p>
                                        <p className="font-medium">{project.role || 'Digital Agency'}</p>
                                    </div>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                            <h3 className="text-xl font-bold mb-6"><ProximityText label="Tech Stack" /></h3>
                            <div className="flex flex-wrap gap-3">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="px-4 py-2 bg-black/40 border border-white/10 rounded-full text-sm text-white/80 hover:border-primary transition-colors">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Project Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-2"
                    >
                        <h2 className="text-4xl font-display font-bold mb-10 text-primary italic">
                            <ProximityText label="Overcoming the Challenge" />
                        </h2>
                        <div className="text-xl text-white/80 leading-relaxed space-y-8">
                            <p>{project.description}</p>
                            <div className="h-px w-full bg-gradient-to-r from-primary/30 to-transparent my-10" />
                            <p>{project.fullContent}</p>
                        </div>

                        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {['Innovative Solution', 'Optimized Performance', 'User-Centric Design', 'Scalable Architecture'].map(item => (
                                <div key={item} className="flex items-center gap-3 p-6 bg-white/5 border border-white/5 rounded-2xl">
                                    <CheckCircle2 size={24} className="text-primary" />
                                    <span className="font-bold">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Perfectly Centered Footer CTA */}
            <section className="w-full flex justify-center mt-32 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-5xl flex flex-col items-center text-center gap-10 p-12 md:p-20 bg-primary/10 border border-primary/20 rounded-[3rem] relative overflow-hidden group shadow-[0_0_50px_rgba(0,230,168,0.1)] mx-auto"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />

                    <div className="relative z-10">
                        <h4 className="text-4xl md:text-6xl font-display font-bold mb-6">
                            <ProximityText label="Interested in similar results?" />
                        </h4>
                        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            <ProximityText label="Let's discuss how we can help your business grow with our specialized digital solutions." />
                        </p>
                    </div>

                    <Link to="/contact" className="relative z-10 px-16 py-6 bg-primary text-black font-bold rounded-full shadow-glow hover:scale-110 active:scale-95 transition-all flex items-center gap-4 text-xl cursor-target">
                        <ProximityText label="Start a Project" /> <ExternalLink size={28} strokeWidth={2.5} />
                    </Link>
                </motion.div>
            </section>
        </div>
    );
};

export default ProjectDetail;
