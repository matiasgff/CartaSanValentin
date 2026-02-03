import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './Letter.css';

const letterVariants = {
    closed: { y: 0, opacity: 0, zIndex: 1, translateZ: 0 },
    open: {
        y: -180,
        opacity: 1,
        zIndex: 100,
        translateZ: 20,
        transition: { delay: 0.5, duration: 0.8, type: "spring", bounce: 0.4 }
    }
};

const textVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
        opacity: 1,
        transition: { delay: 1.5 + (i * 0.1) }
    })
};

const Letter = ({ open }) => {
    const [currentPhoto, setCurrentPhoto] = useState(0);
    const [answer, setAnswer] = useState(null);
    const [noPos, setNoPos] = useState({ x: 0, y: 0 });

    const photos = ["/assets/photo1.png", "/assets/photo2.png"];

    const handleNoHover = () => {
        const randomX = (Math.random() - 0.5) * 200;
        const randomY = (Math.random() - 0.5) * 100;
        setNoPos({ x: randomX, y: randomY });
    };

    const handleYes = () => {
        setAnswer('yes');
        // More confetti!
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.3 }
        });
    };

    const message = [
        "Mi querida Tatiana,",
        "Cada día a tu lado es un capítulo de mi historia favorita.",
        "Tu sonrisa es la luz que ilumina mis días más grises.",
    ];

    return (
        <motion.div
            className={`letter ${answer ? 'expanded' : ''}`}
            variants={letterVariants}
            initial="closed"
            animate={open ? "open" : "closed"}
        >
            {/* Photo Stack with Drag Physics */}
            <div className="photo-stack">
                <AnimatePresence>
                    {photos.map((p, i) => (
                        i >= currentPhoto && (
                            <motion.div
                                key={p}
                                className="photo-polaroid"
                                drag={i === currentPhoto}
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                onDragEnd={(e, info) => {
                                    if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
                                        setCurrentPhoto(prev => prev + 1);
                                    }
                                }}
                                initial={{ rotate: i % 2 === 0 ? -5 : 5, scale: 0.9, opacity: 0, y: 0 }}
                                animate={{
                                    rotate: i === currentPhoto ? 2 : (i % 2 === 0 ? -5 : 5),
                                    scale: i === currentPhoto ? 1 : 0.9,
                                    zIndex: 20 - i,
                                    opacity: open ? 1 : 0, // Only show photos if letter is open
                                    x: 0
                                }}
                                exit={{ x: 500, opacity: 0, rotate: 45, transition: { duration: 0.5 } }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                style={{ cursor: i === currentPhoto ? 'grab' : 'default' }}
                            >
                                <img src={p} alt="Recuerdo" />
                                <span className="tap-hint">{i === currentPhoto ? 'Arrastra para quitar' : ''}</span>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
                {currentPhoto >= photos.length && (
                    <motion.button
                        className="reset-photos"
                        onClick={() => setCurrentPhoto(0)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        🔄 Ver de nuevo
                    </motion.button>
                )}
            </div>

            <div className="text-content">
                {!answer ? (
                    <>
                        {message.map((line, i) => (
                            <motion.p key={i} custom={i} variants={textVariants} initial="hidden" animate={open ? "visible" : "hidden"}>
                                {line}
                            </motion.p>
                        ))}
                        <motion.div
                            className="signature"
                            initial={{ scale: 0 }}
                            animate={open ? { scale: 1 } : { scale: 0 }}
                            transition={{ delay: 2.5 }}
                        >
                            Con amor, tu admirador
                        </motion.div>

                        {/* The Question */}
                        <motion.div
                            className="question-section"
                            initial={{ opacity: 0 }}
                            animate={open ? { opacity: 1 } : {}}
                            transition={{ delay: 4 }}
                        >
                            <h3>¿Me concederías el honor de ser mi Valentín?</h3>
                            <div className="buttons">
                                <button className="yes-btn" onClick={handleYes}>¡ACEPTO! 💖</button>
                                <motion.button
                                    className="no-btn"
                                    animate={{ x: noPos.x, y: noPos.y }}
                                    onMouseEnter={handleNoHover}
                                >
                                    Tal vez... 😅
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                ) : (
                    <motion.div
                        className="final-message"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <h2>¡ES EL MEJOR REGALO MOTOR! ✨</h2>
                        <p>Prometo hacerte sonreír cada día.</p>
                        <motion.div
                            className="huge-heart"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            💖
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default Letter;
