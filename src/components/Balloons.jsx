import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Balloons.css';

const Balloons = ({ show }) => {
    const [balloons, setBalloons] = useState([]);

    useEffect(() => {
        if (!show) {
            setBalloons([]);
            return;
        }

        const interval = setInterval(() => {
            const newBalloon = {
                id: Math.random(),
                // Spread across almost full width, more random
                x: Math.random() * 120 - 60,
                duration: Math.random() * 6 + 10, // Slower for more grace
                scale: Math.random() * 0.4 + 0.7, // Varied sizes
                color: ['#ff1744', '#d50000', '#f50057', '#e91e63'][Math.floor(Math.random() * 4)]
            };

            setBalloons(prev => [...prev, newBalloon]);

            setTimeout(() => {
                setBalloons(prev => prev.filter(b => b.id !== newBalloon.id));
            }, (newBalloon.duration + 2) * 1000);
        }, 1800); // Spawning less frequently (every 1.8s)

        return () => clearInterval(interval);
    }, [show]);

    return (
        <div className="balloons-container">
            <AnimatePresence>
                {balloons.map((b) => (
                    <motion.div
                        key={b.id}
                        className="balloon"
                        style={{
                            left: `${50 + b.x}%`,
                            backgroundColor: b.color,
                            '--balloon-color': b.color
                        }}
                        initial={{ y: "110vh", rotate: -45, scale: b.scale, opacity: 0 }}
                        animate={{
                            y: "-20vh",
                            opacity: 1,
                            x: [0, 20, -20, 0]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            y: { duration: b.duration, ease: "linear" },
                            x: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                            opacity: { duration: 0.5 }
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Balloons;
