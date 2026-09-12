"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

const Magnet = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
  ...props
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 160, damping: 18, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 160, damping: 18, mass: 0.8 });

  const handleMouseMove = (event) => {
    const element = ref.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const distanceFromCenterX = mouseX - centerX;
    const distanceFromCenterY = mouseY - centerY;

    const withinPaddingX = Math.abs(distanceFromCenterX) < rect.width / 2 + padding;
    const withinPaddingY = Math.abs(distanceFromCenterY) < rect.height / 2 + padding;

    if (withinPaddingX && withinPaddingY) {
      x.set((distanceFromCenterX / centerX) * strength);
      y.set((distanceFromCenterY / centerY) * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        willChange: "transform",
        transition: activeTransition,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Magnet;
