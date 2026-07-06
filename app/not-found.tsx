import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center bg-background">
      <div className="space-y-2">
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent opacity-50">404</h1>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Page Not Found</h2>
        <p className="text-muted-foreground max-w-[500px] mx-auto">
          The node you are looking for has been disconnected from the neural net, or it never existed.
        </p>
      </div>
      <Link
        href="/"
        className="btn-base bg-primary text-primary-foreground px-8 py-3 hover:bg-primary/90 mt-4"
      >
        Return to Home Node
      </Link>
    </div>
  );
}
