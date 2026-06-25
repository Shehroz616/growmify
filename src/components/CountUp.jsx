import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

/**
 * CountUp Component (React Bits)
 * Animates a numeric value from a start value to an end value when in view.
 */
export default function CountUp({
  from = 0,
  to = 100,
  duration = 2,
  delay = 0,
  className = '',
  separator = ',',
  decimals = 0,
  direction = 'up',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });
  
  // Set initial count value
  const count = useMotionValue(direction === 'down' ? to : from);

  // Format the value with separators and decimals
  const displayValue = useTransform(count, (latest) => {
    const formatted = latest.toFixed(decimals);
    const parts = formatted.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join('.');
  });

  useEffect(() => {
    if (!isInView) return;

    const startValue = direction === 'down' ? to : from;
    const endValue = direction === 'down' ? from : to;

    // Set value initially in case it changed
    count.set(startValue);

    const controls = animate(count, endValue, {
      delay,
      duration,
      ease: 'easeOut',
    });

    return () => controls.stop();
  }, [isInView, from, to, delay, duration, count, direction]);

  return (
    <motion.span ref={ref} className={className}>
      {displayValue}
    </motion.span>
  );
}
