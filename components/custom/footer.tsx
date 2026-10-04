import Link from "next/link";
import { SiDiscord, SiGithub, SiRoblox } from "@icons-pack/react-simple-icons";
import { ToiletIcon } from "@/components/custom/icons";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { name: "Database", href: "/database" },
      { name: "Units", href: "/database/units" },
      { name: "Crates", href: "/database/crates" },
      { name: "Summons", href: "/database/summons" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Dev Blog", href: "/blog" },
      { name: "Discord", href: "/discord", newTab: true },
      { name: "FAQ", href: "/faq" },
      { name: "Status", href: "/status" },
    ],
  },
];

const socials = [
  { name: "GitHub", href: "https://github.com/iamEvanYT/ttd-website/", Icon: SiGithub },
  { name: "Discord", href: "/discord", Icon: SiDiscord },
  { name: "Roblox", href: "/game", Icon: SiRoblox },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-card/50">
      <div className="container mx-auto px-4 md:px-6 py-12 grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="grid place-items-center size-9 rounded-xl bg-primary text-primary-foreground">
              <ToiletIcon className="h-5 w-5" />
            </span>
            <span className="font-display font-bold text-lg tracking-tight">Toilet Tower Defense</span>
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            Place cameramen and other units to fight back against the invading toilets.
          </p>
          <ul className="flex gap-2">
            {socials.map(({ name, href, Icon }) => (
              <li key={name}>
                <a
                  className="grid place-items-center size-9 rounded-full border bg-background text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/30"
                  rel="noopener noreferrer"
                  target="_blank"
                  href={href}
                  aria-label={name}
                >
                  <Icon size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {footerLinks.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold">{group.title}</h3>
            <ul className="mt-3 space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.newTab ? "_blank" : undefined}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <p className="container mx-auto px-4 md:px-6 py-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Toilet Tower Defense
        </p>
      </div>
    </footer>
  )
}
