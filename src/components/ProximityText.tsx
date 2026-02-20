import { useRef } from 'react';
import VariableProximity from './VariableProximity';

interface ProximityTextProps {
    label: string;
    className?: string;
    fromSettings?: string;
    toSettings?: string;
    containerClassName?: string;
    radius?: number;
    falloff?: 'linear' | 'exponential' | 'gaussian';
    style?: React.CSSProperties;
    onClick?: () => void;
}

const ProximityText = ({
    label,
    className,
    fromSettings,
    toSettings,
    containerClassName,
    radius = 70,
    falloff = 'linear',
    ...props
}: ProximityTextProps) => {
    const containerRef = useRef(null);

    return (
        <span
            ref={containerRef}
            style={{ position: 'relative', display: 'inline-block', verticalAlign: 'middle', ...props.style }}
            className={containerClassName}
        >
            <VariableProximity
                label={label}
                className={className}
                fromFontVariationSettings={fromSettings || "'wght' 400, 'opsz' 9"}
                toFontVariationSettings={toSettings || "'wght' 1000, 'opsz' 40"}
                containerRef={containerRef}
                radius={radius}
                falloff={falloff}
                {...props}
            />
        </span>
    );
};

export default ProximityText;
