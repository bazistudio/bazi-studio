"use client";

import { ReactNode } from "react";
import AnimatedPage from "./AnimatedPage";
import BackgroundEffects from "./BackgroundEffects";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  withBackground?: boolean;
}

export default function PageContainer({
  children,
  className = "",
  withBackground = true,
}: PageContainerProps) {
  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {withBackground && <BackgroundEffects />}
      <div className="relative z-10">
        <AnimatedPage>{children}</AnimatedPage>
      </div>
    </div>
  );
}
