import React, { useState } from 'react';
import Envelope from './components/Envelope';
import Balloons from './components/Balloons';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import Sparkles from './components/Sparkles';
import BokehBackground from './components/BokehBackground';
import CustomCursor from './components/CustomCursor';
import FallingPetals from './components/FallingPetals';
import FloatingPhotos from './components/FloatingPhotos';

function App() {
  const [open, setOpen] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    if (playMusic && audioRef.current) {
      audioRef.current.volume = 0.2; // 20% volume
    }
  }, [playMusic]);

  const handleOpen = (val) => {
    setOpen(val);
    if (val) {
      setPlayMusic(true);

      // Programmatic play trigger for reliability
      const playMainMusic = () => {
        if (audioRef.current) {
          audioRef.current.volume = 0.2;
          audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        }
      };

      // Small delay to ensure the <audio> tag is mounted
      setTimeout(playMainMusic, 100);

      try {
        const audio = new Audio('https://www.soundjay.com/misc/sounds/paper-shuffle-1.mp3');
        audio.volume = 0.4;
        audio.play();
      } catch (e) { }

      // Confetti explosion
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff1744', '#ffffff', '#ff869a']
      });
    }
  };

  return (
    <div className="container" style={{ cursor: 'none' }}>
      <BokehBackground />
      <FallingPetals show={open} />
      <Sparkles />
      <FloatingPhotos show={open} />
      <CustomCursor />

      {/* Cinematic Overlays */}
      <div className="cinematic-vignette" />
      <div className="film-grain" />

      {playMusic && (
        <audio ref={audioRef} autoPlay loop src="/assets/Perfect-1.mp3">
          {/* Using local asset for maximum reliability. instructions sent to user. */}
          Your browser does not support the audio element.
        </audio>
      )}

      <Balloons show={open} />

      {/* Envelope perfectly centered */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Envelope open={open} setOpen={handleOpen} />

        {!open && (
          <motion.div
            className="instruction"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ marginTop: '40px', textAlign: 'center' }}
          >
            Haz click para abrir 💖
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
