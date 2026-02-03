import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Letter from './Letter';
import './Envelope.css';

const Envelope = ({ open, setOpen }) => {
    const [zIndex, setZIndex] = useState(20);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleOpen = () => {
        if (!open) {
            setOpen(true);
            setTimeout(() => setZIndex(1), 300);
        }
    };

    const handleMouseMove = (e) => {
        if (open) return; // Disable tilt when open for cleaner read
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();

        const x = clientX - left;
        const y = clientY - top;

        // Calculate rotation (-15 to 15 degrees)
        const rotateY = ((x / width) - 0.5) * 30;
        const rotateX = ((y / height) - 0.5) * -30;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div className="envelope-outer" style={{ perspective: 1500, zIndex: open ? 100 : 10 }}>
            {/* Click target wrapper */}
            <motion.div
                className="envelope-wrapper"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleOpen}
                animate={open ? {
                    scale: 1,
                    y: 60,
                    rotateX: 0,
                    rotateY: 0
                } : {
                    rotateX: rotation.x,
                    rotateY: rotation.y,
                    scale: 1
                }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                style={{
                    transformStyle: 'preserve-3d',
                    width: '320px',
                    height: '220px',
                    position: 'relative',
                    cursor: open ? 'default' : 'pointer',
                    pointerEvents: 'auto'
                }}
            >
                <div className="envelope" style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }}>
                    <div className="side left" style={{ transform: 'translateZ(1px)', pointerEvents: 'none' }}></div>
                    <div className="side right" style={{ transform: 'translateZ(1px)', pointerEvents: 'none' }}></div>

                    {/* Letter Component - Needs higher translateZ when open */}
                    <Letter open={open} />

                    {/* Flap Animation */}
                    <motion.div
                        className="flap"
                        initial={{ rotateX: 0 }}
                        animate={open ? { rotateX: 180 } : { rotateX: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        style={{ zIndex: zIndex, transformStyle: 'preserve-3d', transformOrigin: 'top', pointerEvents: 'none' }}
                    ></motion.div>

                    {/* Front part - Hide or move back when open */}
                    <div className="front" style={{
                        transform: open ? 'translateZ(-1px)' : 'translateZ(10px)',
                        pointerEvents: 'none'
                    }}></div>

                    {/* Heart Seal */}
                    <motion.div
                        className="heart-seal"
                        animate={open ? { opacity: 0, scale: 0 } : { opacity: 1, scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.3 }}
                        style={{ transform: 'translateZ(11px) translateX(-50%)', pointerEvents: 'none' }}
                    >
                        ❤️
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Envelope;
