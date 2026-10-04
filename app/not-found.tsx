import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { Metadata } from "next";
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you were looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="relative isolate flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute left-1/2 top-1/2 -z-10 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
      <p className="font-display text-[8rem] font-extrabold leading-none tracking-tighter text-primary sm:text-[10rem]">
        404
      </p>
      <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground md:text-lg">
        Oops! Looks like this page got flushed. Don&apos;t worry, our plumbers are on it!
      </p>
      <Button asChild size="lg" className="mt-8 rounded-full">
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
    </main>
  )
}
