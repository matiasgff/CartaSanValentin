import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHOTO_URLS = [
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400",
    "https://images.unsplash.com/photo-1516589174422-e72138499d0e?auto=format&fit=crop&w=400",
    "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=400",
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=400",
    "https://images.unsplash.com/photo-1594462758999-56333671285e?auto=format&fit=crop&w=400",
    "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=400"
];

const FloatingPhotos = ({ show }) => {
    const [activePhotos, setActivePhotos] = useState([]);

    useEffect(() => {
        if (!show) {
            setActivePhotos([]);
            return;
        }

        const interval = setInterval(() => {
            const newPhoto = {
                id: Math.random(),
                url: PHOTO_URLS[Math.floor(Math.random() * PHOTO_URLS.length)] + "&sig=" + Math.random(),
                x: Math.random() * 80 + 10,
                y: Math.random() * 80 + 10,
                rotate: Math.random() * 40 - 20,
                scale: Math.random() * 0.3 + 0.5
            };

            setActivePhotos(prev => [...prev, newPhoto]);

            setTimeout(() => {
                setActivePhotos(prev => prev.filter(p => p.id !== newPhoto.id));
            }, 5000);
        }, 2000);

        return () => clearInterval(interval);
    }, [show]);

    const removePhoto = (id) => {
        setActivePhotos(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
            <AnimatePresence>
                {activePhotos.map(p => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, scale: 0, x: `${p.x}vw`, y: `${p.y}vh`, rotate: p.rotate }}
                        animate={{ opacity: 0.8, scale: p.scale }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 1.5 }}
                        style={{
                            position: 'absolute',
                            width: '180px',
                            padding: '10px 10px 30px 10px',
                            background: 'white',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                            border: '1px solid #eee'
                        }}
                    >
                        <img
                            src={p.url}
                            alt="Love"
                            onError={() => removePhoto(p.id)}
                            style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default FloatingPhotos;
