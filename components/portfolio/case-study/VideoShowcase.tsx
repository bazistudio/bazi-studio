"use client"

import { Youtube, Play } from "lucide-react";
import { useState } from "react";

export default function VideoShowcase({ videos }: { videos: any[] }) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(
    videos && videos.length > 0 ? videos[0].video_id : null
  );

  if (!videos || videos.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        <span className="w-8 h-px bg-primary block" /> Video Walkthrough & Demos
      </h2>

      {/* Main Video Player */}
      {activeVideoId && (
        <div className="glass-panel p-2 md:p-4 rounded-2xl border border-border/60 overflow-hidden shadow-2xl">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=0&rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}

      {/* Multiple Videos Playlist Strip */}
      {videos.length > 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          {videos.map((vid) => {
            const isActive = vid.video_id === activeVideoId;
            return (
              <button
                key={vid.id}
                type="button"
                onClick={() => setActiveVideoId(vid.video_id)}
                className={`text-left p-3 rounded-xl transition-all border flex gap-3 items-center group ${
                  isActive
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border/50 bg-background/50 hover:border-primary/40"
                }`}
              >
                <div className="w-20 aspect-video rounded-lg overflow-hidden relative shrink-0 bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={vid.thumbnail_url || `https://img.youtube.com/vi/${vid.video_id}/hqdefault.jpg`}
                    alt={vid.title || "Video thumbnail"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play size={14} className="text-white fill-white" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-primary font-medium mb-0.5">
                    <Youtube size={12} className="text-red-500" />
                    <span>Walkthrough</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {vid.title || "Video Demo"}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
