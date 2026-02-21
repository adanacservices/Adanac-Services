import React, {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    ReactElement,
    ReactNode,
    RefObject,
    useEffect,
    useMemo,
    useRef
} from 'react';
import gsap from 'gsap';

export interface CardSwapProps {
    width?: number | string;
    height?: number | string;
    cardDistance?: number;
    verticalDistance?: number;
    delay?: number;
    pauseOnHover?: boolean;
    onCardClick?: (idx: number) => void;
    skewAmount?: number;
    easing?: 'linear' | 'elastic';
    children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    customClass?: string;
    isExpanded?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, isExpanded, ...rest }, ref) => (
    <div
        ref={ref}
        data-expanded={isExpanded}
        {...rest}
        className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
    />
));
Card.displayName = 'Card';

type CardRef = RefObject<HTMLDivElement | null>;
interface Slot {
    x: number;
    y: number;
    z: number;
    zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
    gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skew,
        transformOrigin: 'center center',
        zIndex: slot.zIndex,
        force3D: true
    });

const CardSwap: React.FC<CardSwapProps> = ({
    width = 500,
    height = 400,
    cardDistance = 60,
    verticalDistance = 70,
    delay = 5000,
    pauseOnHover = false,
    onCardClick,
    skewAmount = 6,
    easing = 'elastic',
    children
}) => {
    const config = useMemo(() =>
        easing === 'elastic'
            ? {
                ease: 'elastic.out(0.6,0.9)',
                durDrop: 2,
                durMove: 2,
                durReturn: 2,
                promoteOverlap: 0.9,
                returnDelay: 0.05
            }
            : {
                ease: 'power1.inOut',
                durDrop: 0.8,
                durMove: 0.8,
                durReturn: 0.8,
                promoteOverlap: 0.45,
                returnDelay: 0.2
            }, [easing]);

    const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
    const refs = useMemo<CardRef[]>(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);

    const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));

    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const intervalRef = useRef<number>(0);
    const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
    const container = useRef<HTMLDivElement>(null);

    // Drag state
    const dragStartX = useRef<number | null>(null);
    const isDragging = useRef(false);

    const swapNext = React.useCallback(() => {
        if (expandedIndex !== null) return;
        if (order.current.length < 2) return;
        if (tlRef.current && tlRef.current.isActive()) return;

        const [front, ...rest] = order.current;
        const elFront = refs[front].current!;

        // Kill any ongoing tweens
        refs.forEach(r => gsap.killTweensOf(r.current));

        const tl = gsap.timeline();
        tlRef.current = tl;

        tl.to(elFront, {
            y: '+=500',
            duration: config.durDrop,
            ease: config.ease
        });

        tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
        rest.forEach((idx, i) => {
            const el = refs[idx].current!;
            const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
            tl.set(el, { zIndex: slot.zIndex }, 'promote');
            tl.to(
                el,
                {
                    x: slot.x,
                    y: slot.y,
                    z: slot.z,
                    duration: config.durMove,
                    ease: config.ease
                },
                `promote+=${i * 0.15}`
            );
        });

        const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
        tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
        tl.call(
            () => {
                gsap.set(elFront, { zIndex: backSlot.zIndex });
            },
            undefined,
            'return'
        );
        tl.to(
            elFront,
            {
                x: backSlot.x,
                y: backSlot.y,
                z: backSlot.z,
                duration: config.durReturn,
                ease: config.ease
            },
            'return'
        );

        tl.call(() => {
            order.current = [...rest, front];
        });
    }, [expandedIndex, config, cardDistance, verticalDistance, refs, width, height]);

    const swapPrev = React.useCallback(() => {
        if (expandedIndex !== null) return;
        if (order.current.length < 2) return;
        if (tlRef.current && tlRef.current.isActive()) return;

        const last = order.current[order.current.length - 1];
        const rest = order.current.slice(0, -1);
        const elLast = refs[last].current!;

        // Kill any ongoing tweens
        refs.forEach(r => gsap.killTweensOf(r.current));

        const tl = gsap.timeline();
        tlRef.current = tl;

        // Animate everyone else backwards (visually down/back)
        // They are moving from visual index i to i+1
        const newOrder = [last, ...rest];

        // First, move the 'last' card to a hidden 'front-top' position
        const frontSlot = makeSlot(0, cardDistance, verticalDistance, refs.length);

        // We set 'last' card to potentially above the stack to drop in
        gsap.set(elLast, {
            zIndex: frontSlot.zIndex + 1, // temporarily highest
            x: frontSlot.x,
            z: frontSlot.z
        });

        // Animate others to new slots
        rest.forEach((idx, visualIdx) => {
            // visualIdx is 0..N-2. Their new visual index is visualIdx + 1
            const el = refs[idx].current!;
            const slot = makeSlot(visualIdx + 1, cardDistance, verticalDistance, refs.length);

            tl.to(el, {
                x: slot.x,
                y: slot.y,
                z: slot.z,
                zIndex: slot.zIndex,
                duration: config.durMove,
                ease: config.ease
            }, 0);
        });

        // Animate 'last' (now front) dropping in
        tl.fromTo(elLast,
            { y: -500, autoAlpha: 0 },
            {
                y: frontSlot.y,
                autoAlpha: 1,
                duration: config.durReturn,
                ease: config.ease
            },
            0
        );

        tl.call(() => {
            order.current = newOrder;
        });

    }, [expandedIndex, config, cardDistance, verticalDistance, refs, width, height]);

    // Handlers
    const handlePointerDown = (e: React.PointerEvent) => {
        if (expandedIndex !== null) return;
        dragStartX.current = e.clientX;
        isDragging.current = true;

        // Stop auto-rotation while interacting
        clearInterval(intervalRef.current);
        if (tlRef.current) tlRef.current.pause();
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (!isDragging.current || dragStartX.current === null) return;
        isDragging.current = false;

        const deltaX = e.clientX - dragStartX.current;
        const threshold = 50;

        if (deltaX < -threshold) {
            // Swipe Left -> Next
            swapNext();
        } else if (deltaX > threshold) {
            // Swipe Right -> Prev
            swapPrev();
        } else {
            // Resume if no swipe triggered and not hovering?
            // If we paused on hover, we rely on mouseleave to resume.
            // If we just clicked without dragging, we should ensure logic allows click through.
        }

        // Resume interval logic is handled by useEffect or hover handlers mostly.
        // We should restart interval if not hovering.
        // However, 'pauseOnHover' is usually true. 
        // If we dragged, we are likely still hovering.
        // So we don't force restart here.
    };

    const handlePointerLeave = () => {
        isDragging.current = false;
        dragStartX.current = null;
    };

    useEffect(() => {
        const total = refs.length;

        // Initial placement
        refs.forEach((r, i) => {
            const visualIndex = order.current.indexOf(i);
            placeNow(r.current!, makeSlot(visualIndex, cardDistance, verticalDistance, total), skewAmount);
        });

        if (expandedIndex === null) {
            intervalRef.current = window.setInterval(swapNext, delay);
        }

        if (pauseOnHover && expandedIndex === null) {
            const node = container.current!;
            const pause = () => {
                clearInterval(intervalRef.current);
                // We don't necessarily pause the timeline, just the interval trigger
            };
            const resume = () => {
                if (expandedIndex === null) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = window.setInterval(swapNext, delay);
                }
            };

            // We attach specific listeners for hover pausing
            node.addEventListener('mouseenter', pause);
            node.addEventListener('mouseleave', resume);
            return () => {
                node.removeEventListener('mouseenter', pause);
                node.removeEventListener('mouseleave', resume);
                clearInterval(intervalRef.current);
            };
        }

        return () => {
            clearInterval(intervalRef.current);
            tlRef.current?.kill(); // Ensure timeline is killed on unmount
        };
    }, [swapNext, delay, pauseOnHover, skewAmount, expandedIndex, cardDistance, verticalDistance]);

    // Effect to handle expansion animation
    useEffect(() => {
        if (expandedIndex !== null) {
            // Kill the main loop timeline and interval immediately
            if (tlRef.current) tlRef.current.kill();
            clearInterval(intervalRef.current);

            // Kill local tweens to stop any fighting
            refs.forEach(r => gsap.killTweensOf(r.current));

            const el = refs[expandedIndex].current!;

            // Animate expansion
            gsap.to(el, {
                width: '180%',
                x: -150,
                y: -50,
                z: 100,
                zIndex: 40,
                skewY: 0,
                rotate: 0,
                duration: 0.8,
                ease: 'power3.out',
                autoAlpha: 1,
                filter: 'blur(0px)',
                scale: 1,
                overwrite: true
            });

            // Dim others
            refs.forEach((r, i) => {
                if (i !== expandedIndex) {
                    gsap.to(r.current, {
                        autoAlpha: 0.1,
                        filter: 'blur(8px)',
                        scale: 0.9,
                        duration: 0.6,
                        overwrite: true
                    });
                }
            });

        } else {
            // Kill any residual expansion tweens
            refs.forEach(r => gsap.killTweensOf(r.current));

            const total = refs.length;
            refs.forEach((r, i) => {
                // Calculate where this card SHOULD be based on current order
                const visualIndex = order.current.indexOf(i);
                const slot = makeSlot(visualIndex, cardDistance, verticalDistance, total);

                gsap.to(r.current, {
                    width: width,
                    x: slot.x,
                    y: slot.y,
                    z: slot.z,
                    zIndex: slot.zIndex,
                    skewY: skewAmount,
                    scale: 1,
                    autoAlpha: 1,
                    filter: 'blur(0px)',
                    duration: 0.6,
                    ease: 'power2.inOut',
                    xPercent: -50,
                    yPercent: -50,
                    rotate: 0,
                    overwrite: true
                });
            });
        }
    }, [expandedIndex, width, height, cardDistance, verticalDistance, skewAmount]);

    const rendered = childArr.map((child, i) =>
        isValidElement<CardProps>(child)
            ? cloneElement(child, {
                key: i,
                ref: refs[i],
                style: { width, height, ...(child.props.style ?? {}) },
                onClick: e => {
                    // Only click if we didn't drag
                    if (!isDragging.current) {
                        e.stopPropagation();
                        if (expandedIndex === i) {
                            setExpandedIndex(null);
                        } else {
                            setExpandedIndex(i);
                        }
                        child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
                        onCardClick?.(i);
                    }
                },
                isExpanded: i === expandedIndex,
                // Disable default drag behavior on images/links inside
                onDragStart: (e) => e.preventDefault()
            } as CardProps & React.RefAttributes<HTMLDivElement>)
            : child
    );

    return (
        <div
            ref={container}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 perspective-[1200px] overflow-visible scale-100 max-[768px]:scale-[0.8] max-[480px]:scale-[0.6] cursor-grab active:cursor-grabbing touch-none"
            style={{ width, height }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
        >
            {rendered}
        </div>
    );
};

export default CardSwap;
