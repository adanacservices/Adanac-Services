import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ScrollStackItem = ({ children, itemClassName }: { children: React.ReactNode, itemClassName?: string }) => {
    return (
        <div className={`w-full ${itemClassName || ''}`}>
            {children}
        </div>
    );
};

export default function ScrollStack({
    children,
    className = '',
    itemDistance = 40, // Offset between stacked cards
    stackPosition = 120 // Start position from top
}: any) {

    const items = React.Children.toArray(children);
    const total = items.length;

    return (
        <div className={`relative w-full flex flex-col items-center gap-20 pb-40 ${className}`}>
            {items.map((child, i) => {
                return (
                    <CardWrapper
                        key={i}
                        index={i}
                        itemDistance={itemDistance}
                        stackPosition={stackPosition}
                    >
                        {child}
                    </CardWrapper>
                );
            })}
        </div>
    );
}

function CardWrapper({ children, index, stackPosition, itemDistance }: { children: React.ReactNode, index: number, stackPosition: number, itemDistance: number }) {
    const top = stackPosition + (index * itemDistance);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="sticky w-full max-w-3xl will-change-transform"
            style={{
                top: `${top}px`,
                zIndex: index + 10,
                marginBottom: '40px' // Add space below each card so scrolling feels natural
            }}
        >
            {children}
        </motion.div>
    );
}
