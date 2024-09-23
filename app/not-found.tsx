import { Button } from "@/components/ui/button"
import { Frown, Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="space-y-4">
          <Frown className="w-24 h-24 mx-auto text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900 dark:text-gray-100">
            404 - Page Not Found
          </h1>
          <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Oops! Looks like this page got flushed. Don't worry, our plumbers are on it!
          </p>
          <div className="flex justify-center">
            <Link href="/">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}