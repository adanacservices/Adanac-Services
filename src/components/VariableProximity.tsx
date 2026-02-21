import { forwardRef, useMemo, useRef, useEffect, MutableRefObject, CSSProperties, HTMLAttributes } from 'react';
import { motion } from 'motion/react';

function useAnimationFrame(callback: () => void) {
    useEffect(() => {
        let frameId: number;
        const loop = () => {
            callback();
            frameId = requestAnimationFrame(loop);
        };
        frameId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frameId);
    }, [callback]);
}

function useMousePositionRef(containerRef: MutableRefObject<HTMLElement | null>) {
    const positionRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        /*
          We only want to track mouse relative to the container if we have a containerRef.
          However, the original code had a bug where it expects `updatePosition` to be strictly about the container.
          Let's adapt it to be robust. 
          The provided code attaches listeners to window, and calculates offset in the update function.
        */
        const updatePosition = (x: number, y: number) => {
            if (containerRef?.current) {
                const rect = containerRef.current.getBoundingClientRect();
                positionRef.current = { x: x - rect.left, y: y - rect.top };
            } else {
                positionRef.current = { x, y };
            }
        };

        const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
        const handleTouchMove = (ev: TouchEvent) => {
            const touch = ev.touches[0];
            updatePosition(touch.clientX, touch.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [containerRef]);

    return positionRef;
}

interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
    label: string;
    fromFontVariationSettings: string;
    toFontVariationSettings: string;
    containerRef: MutableRefObject<HTMLElement | null>;
    radius?: number;
    falloff?: 'linear' | 'exponential' | 'gaussian';
    className?: string;
    onClick?: () => void;
    style?: CSSProperties;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
    const {
        label,
        fromFontVariationSettings,
        toFontVariationSettings,
        containerRef,
        radius = 50,
        falloff = 'linear',
        className = '',
        onClick,
        style,
        ...restProps
    } = props;

    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const interpolatedSettingsRef = useRef<string[]>([]);
    const mousePositionRef = useMousePositionRef(containerRef);
    const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

    const parsedSettings = useMemo(() => {
        const parseSettings = (settingsStr: string) =>
            new Map(
                settingsStr
                    .split(',')
                    .map(s => s.trim())
                    .map(s => {
                        const [name, value] = s.split(' ');
                        return [name.replace(/['"]/g, ''), parseFloat(value)];
                    })
            );

        const fromSettings = parseSettings(fromFontVariationSettings);
        const toSettings = parseSettings(toFontVariationSettings);

        return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
            axis,
            fromValue,
            toValue: toSettings.get(axis) ?? fromValue
        }));
    }, [fromFontVariationSettings, toFontVariationSettings]);

    const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
        Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    const calculateFalloff = (distance: number) => {
        const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
        switch (falloff) {
            case 'exponential':
                return norm ** 2;
            case 'gaussian':
                return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
            case 'linear':
            default:
                return norm;
        }
    };

    const falloffValuesRef = useRef<number[]>([]);

    useAnimationFrame(() => {
        if (!containerRef?.current) return;
        const { x, y } = mousePositionRef.current;

        const containerRect = containerRef.current.getBoundingClientRect();

        letterRefs.current.forEach((letterRef, index) => {
            if (!letterRef) return;

            const rect = letterRef.getBoundingClientRect();
            const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
            const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

            const distance = calculateDistance(
                mousePositionRef.current.x,
                mousePositionRef.current.y,
                letterCenterX,
                letterCenterY
            );

            const targetFalloff = distance >= radius ? 0 : calculateFalloff(distance);

            // Damping logic: Lerp current value towards target
            if (falloffValuesRef.current[index] === undefined) falloffValuesRef.current[index] = 0;

            const currentFalloff = falloffValuesRef.current[index];
            const smoothing = 0.15; // Lower = smoother/slower, Higher = faster
            const nextFalloff = currentFalloff + (targetFalloff - currentFalloff) * smoothing;

            falloffValuesRef.current[index] = nextFalloff;

            // Optimization: skip setting style if falloff is practically zero and was zero before
            if (nextFalloff < 0.001 && currentFalloff < 0.001) return;

            const newSettings = parsedSettings
                .map(({ axis, fromValue, toValue }) => {
                    const interpolatedValue = fromValue + (toValue - fromValue) * nextFalloff;
                    return `'${axis}' ${interpolatedValue}`;
                })
                .join(', ');

            letterRef.style.fontVariationSettings = newSettings;
        });
    });

    const words = label.split(' ');
    // Track global letter index to map to correct refs
    let letterCount = 0;

    return (
        <span
            ref={ref}
            onClick={onClick}
            style={{
                display: 'inline',
                fontFamily: '"Roboto Flex", sans-serif',
                ...style
            }}
            className={className}
            {...restProps}
        >
            {words.map((word, wordIndex) => {
                const wordEl = (
                    <span key={wordIndex} className="inline-block whitespace-nowrap">
                        {word.split('').map((letter) => {
                            const currentLetterIndex = letterCount++;
                            return (
                                <motion.span
                                    key={currentLetterIndex}
                                    ref={(el) => {
                                        letterRefs.current[currentLetterIndex] = el;
                                    }}
                                    style={{
                                        display: 'inline-block',
                                        fontVariationSettings: interpolatedSettingsRef.current[currentLetterIndex]
                                    }}
                                    aria-hidden="true"
                                >
                                    {letter}
                                </motion.span>
                            );
                        })}
                    </span>
                );
                // Add space after word if it's not the last one
                return (
                    <span key={`w-${wordIndex}`}>
                        {wordEl}
                        {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
                    </span>
                )
            })}
            <span className="sr-only">{label}</span>
        </span>
    );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
