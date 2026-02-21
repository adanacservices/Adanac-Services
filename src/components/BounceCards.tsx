import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProximityText from './ProximityText';

interface CardData {
    image: string;
    title: string;
    desc: string;
    icon?: any;
}

interface BounceCardsProps {
    className?: string;
    data?: CardData[];
    containerWidth?: number;
    containerHeight?: number;
    animationDelay?: number;
    animationStagger?: number;
    easeType?: string;
    transformStyles?: string[];
    enableHover?: boolean;
}

export default function BounceCards({
    className = '',
    data = [],
    containerWidth = 400,
    containerHeight = 400,
    animationDelay = 0.5,
    animationStagger = 0.06,
    easeType = 'elastic.out(1, 0.8)',
    transformStyles = [
        'rotate(10deg) translate(-170px)',
        'rotate(5deg) translate(-85px)',
        'rotate(-3deg)',
        'rotate(-10deg) translate(85px)',
        'rotate(2deg) translate(170px)'
    ],
    enableHover = false
}: BounceCardsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = screenWidth < 768;

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.card',
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    stagger: animationStagger,
                    ease: easeType,
                    delay: animationDelay
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, [animationDelay, animationStagger, easeType]);

    const getNoRotationTransform = (transformStr: string): string => {
        const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
        if (hasRotate) {
            return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
        } else if (transformStr === 'none') {
            return 'rotate(0deg)';
        } else {
            return `${transformStr} rotate(0deg)`;
        }
    };

    const getPushedTransform = (baseTransform: string, offsetX: number): string => {
        const translateRegex = /translate\(([-0-9.a-z% \s]+)\)/;
        const match = baseTransform.match(translateRegex);

        if (match) {
            const parts = match[1].split(',').map(p => p.trim());
            const currentX = parseFloat(parts[0]);
            const newX = currentX + offsetX;
            const newTranslate = parts.length > 1
                ? `translate(${newX}px, ${parts[1]})`
                : `translate(${newX}px)`;
            return baseTransform.replace(translateRegex, newTranslate);
        } else {
            return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
        }
    };

    const desktopTransformStyles = useMemo(() => transformStyles, [transformStyles]);

    const pushSiblings = (idx: number) => {
        if (isMobile) return;
        setHoveredIdx(idx);
        const q = gsap.utils.selector(containerRef);
        if (!enableHover || !containerRef.current) return;

        data.forEach((_, i) => {
            const selector = q(`.card-${i}`);
            gsap.killTweensOf(selector);

            const baseTransform = desktopTransformStyles[i] || 'none';

            if (i === idx) {
                const noRotation = getNoRotationTransform(baseTransform);
                gsap.to(selector, {
                    transform: noRotation,
                    zIndex: 100,
                    scale: 1.3,
                    duration: 0.5,
                    ease: 'back.out(1.2)',
                    overwrite: 'auto'
                });
            } else {
                const offsetX = i < idx ? -420 : 420;
                const pushedTransform = getPushedTransform(baseTransform, offsetX);

                const distance = Math.abs(idx - i);
                const delay = distance * 0.03;

                gsap.to(selector, {
                    transform: pushedTransform,
                    zIndex: 10 + i,
                    scale: 0.9,
                    duration: 0.5,
                    ease: 'power3.out',
                    delay,
                    overwrite: 'auto'
                });
            }
        });
    };

    const resetSiblings = () => {
        if (isMobile) return;
        setHoveredIdx(null);
        if (!enableHover || !containerRef.current) return;
        const q = gsap.utils.selector(containerRef);

        data.forEach((_, i) => {
            const selector = q(`.card-${i}`);
            gsap.killTweensOf(selector);

            const baseTransform = desktopTransformStyles[i] || 'none';
            gsap.to(selector, {
                transform: baseTransform,
                zIndex: 10 + i,
                scale: 1,
                duration: 0.4,
                ease: 'back.out(1.4)',
                overwrite: 'auto'
            });
        });
    };

    // Mobile specific animation logic
    useEffect(() => {
        if (!isMobile || !containerRef.current) return;
        const q = gsap.utils.selector(containerRef);

        const ctx = gsap.context(() => {
            data.forEach((_, i) => {
                const selector = q(`.card-${i}`);
                const isActive = i === activeIndex;
                const diff = i - activeIndex;

                // Stack transform logic
                let x = 0;
                let zIndex = 100 - Math.abs(diff);
                let scale = 1 - Math.abs(diff) * 0.1;
                let opacity = 1 - Math.abs(diff) * 0.4;
                let rotate = diff * 5;

                if (isActive) {
                    x = 0;
                    scale = 1.1;
                    rotate = 0;
                    opacity = 1;
                } else {
                    x = diff * 40; // Slight overlap stack
                }

                gsap.to(selector, {
                    x,
                    scale,
                    zIndex,
                    opacity: Math.max(0, opacity),
                    rotate,
                    duration: 0.6,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, [activeIndex, isMobile, data.length]);

    const nextCard = useCallback(() => {
        setActiveIndex(prev => (prev + 1) % data.length);
    }, [data.length]);

    const prevCard = useCallback(() => {
        setActiveIndex(prev => (prev - 1 + data.length) % data.length);
    }, [data.length]);

    return (
        <div
            className={`relative flex items-center justify-center ${className}`}
            style={{ width: isMobile ? '100%' : containerWidth, height: containerHeight }}
        >
            {/* Mobile Arrows */}
            {isMobile && (
                <>
                    <button
                        onClick={prevCard}
                        className="absolute left-4 z-[200] w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center backdrop-blur-md text-white active:scale-90 transition-transform"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextCard}
                        className="absolute right-4 z-[200] w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center backdrop-blur-md text-white active:scale-90 transition-transform"
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            <div
                className="relative flex items-center justify-center w-full h-full"
                ref={containerRef}
            >
                {data.map((item, idx) => {
                    const Icon = item.icon;
                    const isHovered = !isMobile && hoveredIdx === idx;
                    const isActiveMobile = isMobile && activeIndex === idx;
                    const isDetailVisible = isHovered || isActiveMobile;

                    return (
                        <div
                            key={idx}
                            className={`card card-${idx} absolute w-64 aspect-[3/4.2] border border-white/20 rounded-2xl overflow-hidden bg-black/90 backdrop-blur-md group transition-all duration-300`}
                            style={{
                                boxShadow: isDetailVisible ? '0 30px 60px rgba(0, 255, 170, 0.2)' : '0 20px 40px rgba(0, 0, 0, 0.4)',
                                transform: !isMobile ? (desktopTransformStyles[idx] || 'none') : 'none'
                            }}
                            onMouseEnter={() => pushSiblings(idx)}
                            onMouseLeave={resetSiblings}
                        >
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    className={`w-full h-full object-cover transition-[opacity,filter,transform] duration-500 ${isDetailVisible ? 'scale-110 opacity-30 blur-sm' : 'opacity-60 grayscale'}`}
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            </div>

                            {/* Card Content */}
                            <div className="relative z-10 h-full p-6 flex flex-col justify-end pointer-events-none">
                                <div className={`transition-transform duration-500 ease-out ${isDetailVisible ? 'transform -translate-y-4' : ''}`}>
                                    {Icon && (
                                        <div className={`w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mb-4 border border-primary/30 transition-[background-color,transform,color] duration-500 ${isDetailVisible ? 'scale-110 rotate-12 bg-primary' : ''}`}>
                                            <Icon className={`w-6 h-6 ${isDetailVisible ? 'text-black' : 'text-primary'}`} />
                                        </div>
                                    )}

                                    <h3 className={`text-2xl font-display font-bold text-white mb-2 leading-tight transition-colors duration-300 ${isDetailVisible ? 'text-primary' : ''}`}>
                                        <ProximityText label={item.title} />
                                    </h3>

                                    <div className={`overflow-hidden transition-[max-height,opacity,margin] duration-500 ease-in-out ${isDetailVisible ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            <ProximityText label={item.desc} className="text-sm" />
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Border Effect */}
                            <div className={`absolute inset-0 border-2 border-primary/50 rounded-2xl transition-opacity duration-300 pointer-events-none ${isDetailVisible ? 'opacity-100' : 'opacity-0'}`} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
