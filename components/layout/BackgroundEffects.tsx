"use client";

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary Glow */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 dark:bg-primary/10 blur-[120px]" />
      
      {/* Secondary Glow */}
      <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-accent/20 dark:bg-accent/10 blur-[150px]" />
      
      {/* Deep Violet Glow */}
      <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-secondary/20 dark:bg-secondary/10 blur-[130px]" />
      
      {/* Subtle Grid Overlay (Optional) */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 dark:opacity-10" />
    </div>
  );
}
