import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TimeDisplay() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            timeZone: 'Asia/Kolkata',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const parts = formatter.formatToParts(date);

        const hour = parts.find(p => p.type === 'hour')?.value || '12';
        const minute = parts.find(p => p.type === 'minute')?.value || '00';
        const second = parts.find(p => p.type === 'second')?.value || '00';
        const dayPeriod = parts.find(p => p.type === 'dayPeriod')?.value || 'AM';

        // Pad hour if single digit for consistent look (optional, but 04:05:06 looks better than 4:05:06 on clock)
        const paddedHour = hour.length === 1 ? `0${hour}` : hour;

        return { timeString: `${paddedHour}:${minute}:${second}`, ampm: dayPeriod };
    };

    const { timeString, ampm } = formatTime(time);

    return (
        <div className="flex flex-col select-none">
            <div className="flex items-baseline gap-2 font-display font-medium text-white">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl tracking-tight tabular-nums whitespace-nowrap"
                >
                    {timeString}
                </motion.span>
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-xl md:text-2xl text-muted-foreground"
                >
                    {ampm}
                </motion.span>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-muted-foreground font-bold tracking-[0.2em] mt-2 pl-2 uppercase"
            >
                IST • New Delhi
            </motion.div>
        </div>
    );
}
