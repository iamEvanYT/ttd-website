export default function Footer() {
  return (
    <div className="bg-ghost-accent-color text-white">
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
        <p className="text-s text-white">© {new Date().getFullYear()} Toilet Tower Defense. All rights reserved.</p>
      </footer>
    </div>
  )
}