export default function Loading() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Futuristic Grid Scanner Animation */}
        <div className="w-32 h-32 relative mb-8">
          <div className="absolute inset-0 border border-primary/20 rounded-xl overflow-hidden glass-panel">
            <div className="w-full h-[2px] bg-primary/60 shadow-md shadow-primary/80 animate-[scan_2s_ease-in-out_infinite]" />
          </div>
          <div className="absolute inset-0 border border-primary/40 rounded-xl rotate-45 scale-75 opacity-50" />
        </div>

        <h2 className="text-xl font-bold tracking-[0.2em] text-foreground/80 uppercase animate-pulse">
          Initializing Lab
        </h2>
        <div className="mt-4 flex gap-1">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-[bounce_1s_infinite_100ms]" />
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-[bounce_1s_infinite_200ms]" />
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-[bounce_1s_infinite_300ms]" />
        </div>
      </div>
    </div>
  )
}
