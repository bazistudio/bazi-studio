"use client"

import { Image as ImageIcon, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function MediaGallery({ media }: { media: any[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryMedia = media?.filter((m) => m.type === "image" && m.role !== "hero");

  if (!galleryMedia || galleryMedia.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
        <span className="w-8 h-px bg-primary block" /> Visual Assets
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {galleryMedia.map((item, index) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedImage(item.url)}
            className={`glass-panel rounded-2xl overflow-hidden border border-border/50 group cursor-pointer ${
              galleryMedia.length % 2 !== 0 && index === galleryMedia.length - 1 ? 'md:col-span-2' : ''
            }`}
          >
            <div className="relative aspect-video">
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none flex items-center justify-center">
                 <span className="bg-background/80 text-foreground px-4 py-2 rounded-full backdrop-blur-sm text-sm font-medium shadow-xl translate-y-4 group-hover:translate-y-0 transition-all">
                    Expand Image
                 </span>
              </div>
              <Image 
                src={item.url} 
                alt={item.file_name} 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transform group-hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button className="absolute top-8 right-8 w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center text-foreground hover:bg-muted transition-colors">
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Expanded view"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl border border-border/50"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
