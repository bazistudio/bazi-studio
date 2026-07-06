"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  animate?: boolean;
}

export default function Section({
  children,
  className = "",
  id,
  animate = true,
}: SectionProps) {
  const content = (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      {children}
    </div>
  );

  return (
    <section id={id} className={`py-20 md:py-32 ${className}`}>
      {animate ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {content}
        </motion.div>
      ) : (
        content
      )}
    </section>
  );
}
