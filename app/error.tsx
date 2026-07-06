"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Something went wrong!</h2>
        <p className="text-muted-foreground">
          A critical error occurred in the Matrix. Our agents are looking into it.
        </p>
      </div>
      <button
        onClick={() => reset()}
        className="btn-base bg-primary text-primary-foreground px-6 py-2 hover:bg-primary/90"
      >
        Reboot Sequence
      </button>
    </div>
  );
}
