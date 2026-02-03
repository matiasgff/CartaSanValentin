import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const mouseX = useSpring(0, { stiffness: 500, damping: 30 });
    const mouseY = useSpring(0, { stiffness: 500, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.closest('.envelope-wrapper') || e.target.closest('.photo-stack')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 10000 }}>
            {/* Outer Glow */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: -20,
                    top: -20,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 105, 180, 0.3)',
                    filter: 'blur(10px)',
                    x: mouseX,
                    y: mouseY,
                    scale: isHovering ? 2 : 1
                }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            />
            {/* Heart Cursor */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: -10,
                    top: -10,
                    fontSize: '20px',
                    x: mouseX,
                    y: mouseY,
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    rotate: isHovering ? [0, -10, 10, 0] : 0
                }}
            >
                💖
            </motion.div>
        </div>
    );
};

export default CustomCursor;
