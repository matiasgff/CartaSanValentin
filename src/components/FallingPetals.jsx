import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FallingPetals = ({ show }) => {
    const [petals, setPetals] = useState([]);

    useEffect(() => {
        if (!show) {
            setPetals([]);
            return;
        }

        const interval = setInterval(() => {
            const newPetal = {
                id: Math.random(),
                x: Math.random() * 100,
                rotate: Math.random() * 360,
                size: Math.random() * 15 + 10,
                duration: Math.random() * 10 + 10,
                delay: Math.random() * -10
            };

            setPetals(prev => [...prev.slice(-20), newPetal]);
        }, 1500);

        return () => clearInterval(interval);
    }, [show]);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
            <AnimatePresence>
                {petals.map(p => (
                    <motion.div
                        key={p.id}
                        initial={{ y: -50, x: `${p.x}vw`, rotate: p.rotate, opacity: 0 }}
                        animate={{
                            y: '110vh',
                            x: `${p.x + (Math.sin(p.id) * 10)}vw`,
                            rotate: p.rotate + 360,
                            opacity: [0, 0.6, 0.3]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: p.duration, ease: "linear", delay: p.delay }}
                        style={{
                            position: 'absolute',
                            width: p.size,
                            height: p.size * 1.2,
                            backgroundColor: '#ff4d6d',
                            borderRadius: '50% 0 50% 50%',
                            boxShadow: 'inset -2px -2px 5px rgba(0,0,0,0.1)'
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default FallingPetals;
