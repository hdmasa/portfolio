"use client";
import { motion } from "motion/react";

const FadeIn = ({
  as = "div",
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  ...props
}) => {
  const componentMap = {
    a: motion.a,
    button: motion.button,
    div: motion.div,
    span: motion.span,
  };

  const Component = componentMap[as] || motion.div;

  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      {...props}
    >
      {children}
    </Component>
  );
};

const ContactButton = ({
  label = "Contact Me",
  href = "#contact",
  className = "",
}) => {
  return (
    <FadeIn
      as="a"
      href={href}
      className={[
        "inline-flex items-center justify-center rounded-full border-2 border-white/10 bg-[linear-gradient(123deg,#18011F_7%,#B600A8_37%,#7621B0_72%,#BE4C00_100%)] px-8 py-3 text-xs font-medium uppercase tracking-[0.35em] text-white shadow-[0px_4px_4px_rgba(181,1,167,0.25)] outline outline-2 outline-white/80 outline-offset-[-3px] transition-transform duration-200 hover:-translate-y-1 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base",
        className,
      ].join(" ")}
      delay={0.1}
      duration={0.7}
    >
      {label}
    </FadeIn>
  );
};

export default ContactButton;
