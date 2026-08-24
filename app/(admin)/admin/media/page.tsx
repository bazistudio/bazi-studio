import { createClient } from "@/lib/database/server";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import Image from "next/image";
import Link from "next/link";
import { Image as ImageIcon, Video, File as FileIcon, ExternalLink, HardDrive } from "lucide-react";

export default async function AdminMediaPage() {
  const supabase = await createClient();
  const { data: mediaItems } = await supabase
    .from("project_media")
    .select(`
      *,
      projects(id, title, slug)
    `)
    .order("created_at", { ascending: false });

  const items = mediaItems || [];

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Media Assets"
        description="Browse and inspect all physical files stored in the portfolio-media Supabase Storage bucket."
        badge={`${items.length} Assets`}
      />

      {items.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="No media assets"
          description="Uploaded images, videos, and documentation files will appear here when you upload assets inside a project."
          actionLabel="Browse Projects"
          actionHref="/admin/projects"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item: any) => (
            <div
              key={item.id}
              className="glass-panel rounded-2xl overflow-hidden border border-border/80 bg-card/60 flex flex-col group hover:border-primary/50 transition-all shadow-sm"
            >
              <div className="relative aspect-video bg-muted/30 overflow-hidden flex items-center justify-center">
                {item.type === "image" ? (
                  <Image
                    src={item.url}
                    alt={item.file_name || "Media asset"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : item.type === "video" ? (
                  <div className="flex flex-col items-center text-muted-foreground">
                    <Video size={32} className="mb-1 opacity-60" />
                    <span className="text-xs">Video File</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-muted-foreground">
                    <FileIcon size={32} className="mb-1 opacity-60" />
                    <span className="text-xs">Document</span>
                  </div>
                )}

                <div className="absolute top-2 left-2 z-10">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground">
                    {item.role || item.type}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1 min-w-0">
                  <p className="text-xs font-bold text-foreground truncate" title={item.file_name}>
                    {item.file_name || "Asset"}
                  </p>
                  {item.projects?.title && (
                    <Link
                      href={`/admin/projects/${item.projects.id}`}
                      className="text-[11px] text-primary hover:underline truncate block"
                    >
                      Project: {item.projects.title}
                    </Link>
                  )}
                </div>

                <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                  <span>{item.file_size ? `${(item.file_size / 1024 / 1024).toFixed(2)} MB` : "Storage Asset"}</span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-0.5"
                  >
                    <span>View</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
