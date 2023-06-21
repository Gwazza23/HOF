import './Hero.css'
import {useScroll, useTransform, motion} from 'framer-motion';
import { useRef } from 'react';

function Hero() {
  const targetRef = useRef(null);
  const {scrollYProgress} = useScroll({
    target: targetRef,
    offset: ["end end","end start"]
  })

  const opacity = useTransform(scrollYProgress, [0,0.8],[1,0]);

  return (
    <motion.div style={{opacity}} className='hero-div' ref={targetRef}>
    <div className="hero-text">
      <h2>Discover <span id='fashion'>Fashion</span> at your <span id='fingertips'>fingertips</span></h2>
      <h4>Est. 2023</h4>
    </div>
    </motion.div>
  );
}

export default Hero;
