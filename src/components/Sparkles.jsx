import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sparkles = () => {
    const [sparkles, setSparkles] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (Math.random() < 0.3) return; // Limit creation rate

            const newSparkle = {
                id: Math.random(),
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 15 + 5,
                color: ['#ffdd00', '#ff3366', '#ffffff'][Math.floor(Math.random() * 3)]
            };

            setSparkles(prev => [...prev.slice(-20), newSparkle]); // Keep last 20
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
            <AnimatePresence>
                {sparkles.map(sparkle => (
                    <motion.div
                        key={sparkle.id}
                        initial={{ opacity: 1, scale: 0, x: sparkle.x, y: sparkle.y }}
                        animate={{ opacity: 0, scale: 1, y: sparkle.y + 50 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        onAnimationComplete={() => setSparkles(prev => prev.filter(s => s.id !== sparkle.id))}
                        style={{
                            position: 'absolute',
                            width: sparkle.size,
                            height: sparkle.size,
                            backgroundColor: sparkle.color,
                            borderRadius: '50%',
                            boxShadow: '0 0 10px ' + sparkle.color
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Sparkles;
