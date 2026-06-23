import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useAppStore from '../store/useAppStore';
import SplitText from "./SplitText";

export default function Preloader() {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);
  const counterRef = useRef(null);
  const setLoaded = useAppStore((s) => s.setLoaded);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate progress bar
    tl.to(progressRef.current, {
      width: '100%',
      duration: 2,
      ease: 'power2.inOut',
    });

    // Counter count up
    const obj = { val: 0 };
    tl.to(
      obj,
      {
        val: 100,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current)
            counterRef.current.textContent = Math.round(obj.val) + '%';
        },
      },
      '<'
    );



    // Exit animation
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'expo.inOut',
      delay: 0.5,
      onComplete: () => setLoaded(),
    });

    return () => tl.kill();
  }, [setLoaded]);

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <div ref={containerRef} className="preloader">
      {/* Big logo text split into letters */}
      <div
        ref={textRef}
        className="flex overflow-hidden"
        aria-label="Growmify"
      >
        <SplitText
          text="Growmify"
          className="text-8xl font-semibold text-center"
          delay={50}
          duration={1.5}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
          showCallback={false}
        />

      </div>

      {/* Progress bar */}
      <div className="w-64 md:w-96 h-[1px] bg-white/10 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-primary rounded-full"
          style={{ width: '0%' }}
        />
      </div>

      {/* Counter */}
      <span
        ref={counterRef}
        className="font-mono text-xs text-text-muted tracking-widest"
      >
        0%
      </span>

      {/* Tag line */}
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">
        Devouring Details in Growth
      </p>
    </div>
  );
}
