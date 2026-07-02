import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(GSAPSplitText);

export default function SplitText({
  text,
  className = "",
  tag = "p",
  delay = 0.05,
  duration = 1,
  ease = "power3.out",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  onLetterAnimationComplete,
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    let split;

    const ctx = gsap.context(() => {
      split = new GSAPSplitText(ref.current, {
        type: "chars",
        charsClass: "split-char",
      });

      gsap.fromTo(
        split.chars,
        from,
        {
          ...to,
          duration,
          ease,
          stagger: delay,
          onComplete: () => {
            onLetterAnimationComplete?.();
          },
        }
      );
    }, ref);

    return () => {
      ctx.revert();

      if (split) {
        try {
          split.revert();
        } catch (e) {
          // ignore cleanup errors
        }
      }
    };
  }, [
    text,
    delay,
    duration,
    ease,
    JSON.stringify(from),
    JSON.stringify(to),
  ]);

  const Tag = tag;

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
}