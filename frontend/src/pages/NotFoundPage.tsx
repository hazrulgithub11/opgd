import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="font-display text-6xl font-semibold text-foreground">
        404
      </h1>
      <p className="text-muted-foreground">This page does not exist.</p>
      <Link
        to="/"
        className="mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-80"
      >
        Go home
      </Link>
    </main>
  );
}
