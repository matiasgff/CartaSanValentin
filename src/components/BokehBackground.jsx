import React from 'react';
import { motion } from 'framer-motion';

const BokehBackground = () => {
    const circles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        size: Math.random() * 200 + 100,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 20,
        delay: Math.random() * -20,
        color: i % 2 === 0 ? 'rgba(255, 51, 102, 0.15)' : 'rgba(252, 228, 236, 0.4)'
    }));

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            overflow: 'hidden',
            background: 'radial-gradient(circle at center, #fff5f8 0%, #fce4ec 100%)'
        }}>
            {circles.map(c => (
                <motion.div
                    key={c.id}
                    animate={{
                        x: [`${c.x}vw`, `${(c.x + 10) % 100}vw`, `${c.x}vw`],
                        y: [`${c.y}vh`, `${(c.y + 10) % 100}vh`, `${c.y}vh`],
                    }}
                    transition={{
                        duration: c.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: c.delay
                    }}
                    style={{
                        position: 'absolute',
                        width: c.size,
                        height: c.size,
                        borderRadius: '50%',
                        backgroundColor: c.color,
                        filter: 'blur(60px)',
                        pointerEvents: 'none'
                    }}
                />
            ))}
        </div>
    );
};

export default BokehBackground;
