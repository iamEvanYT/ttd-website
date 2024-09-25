import { SiDiscord, SiGithub, SiRoblox } from "@icons-pack/react-simple-icons";

export default function Footer() {
  return (
    <div className="mt-auto bg-ghost-accent-color text-white">
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 w-full px-4 md:px-6">
        {/* Copyright Section */}
        <p className="text-base text-white">
          © {new Date().getFullYear()} Toilet Tower Defense
        </p>

        {/* Social Icons Section */}
        <ul className="flex space-x-4 text-neutral-600 dark:text-neutral-300">
          <li className="list-none">
            <a
              className="flex items-center transition-colors text-neutral-50 hover:text-neutral-300"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/iamEvanYT/ttd-website/"
              aria-label="GitHub"
            >
              <SiGithub size={24} />
            </a>
          </li>
          <li className="list-none">
            <a
              className="flex items-center transition-colors text-neutral-50 hover:text-neutral-300"
              rel="noopener noreferrer"
              target="_blank"
              href="https://discord.com/invite/SrnQt2yDeZ"
              aria-label="Discord"
            >
              <SiDiscord size={24} />
            </a>
          </li>
          <li className="list-none">
            <a
              className="flex items-center transition-colors text-neutral-50 hover:text-neutral-300"
              rel="noopener noreferrer"
              target="_blank"
              href="/game"
              aria-label="Roblox"
            >
              <SiRoblox size={24} />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  )
}