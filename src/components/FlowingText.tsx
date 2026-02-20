import { useRef, ReactNode } from 'react';
import {
    motion,
    useScroll,
    useVelocity,
    useSpring,
    useTransform
} from 'framer-motion';

interface FlowingTextProps {
    children: ReactNode;
    className?: string;
    velocityScale?: number;
    skewScale?: number;
}

const FlowingText = ({
    children,
    className = '',
    velocityScale = 0.1,
    skewScale = 0.05
}: FlowingTextProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Create a smoothed velocity value
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Map velocity to transformations
    // Vertical displacement based on velocity (parallax feel)
    const y = useTransform(smoothVelocity, [-2000, 0, 2000], [-50 * velocityScale, 0, 50 * velocityScale]);

    // Skew effect based on velocity
    const skewY = useTransform(smoothVelocity, [-2000, 0, 2000], [-15 * skewScale, 0, 15 * skewScale]);

    return (
        <motion.div
            ref={ref}
            style={{ y, skewY }}
            className={`will-change-transform ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default FlowingText;
