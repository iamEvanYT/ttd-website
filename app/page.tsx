import { GameFeatureCard } from "@/components/custom/game-feature-card"
import { HomeBanner } from "@/components/custom/home-banner";
import { LatestBlogPost } from "@/components/blog/latest-blog-post"
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { Shield, Trophy, Sparkles, Castle, Handshake, Gamepad2Icon, ArrowRight } from "lucide-react"
import Link from "next/link";

function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string,
  title: string,
  action?: React.ReactNode,
}) {
  return (
    <div className="mb-8 md:mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
      </div>
      {action}
    </div>
  )
}

function GameFeaturesSection() {
  return (
    <section id="features" className="container mx-auto px-4 md:px-6">
      <SectionHeading eyebrow="Game Features" title="Everything you need to defend the tower" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <GameFeatureCard index={0} title="Strategic Defense" description="Place cameramen and other units to defend the tower against toilets!">
          <Castle />
        </GameFeatureCard>
        <GameFeatureCard index={1} title="Summon Units" description="Earn coins by winning matches, and summon more powerful units using coins!">
          <Sparkles />
        </GameFeatureCard>
        <GameFeatureCard index={2} title="Trading" description="Trade to get unobtainable units from other players!">
          <Handshake />
        </GameFeatureCard>
        <GameFeatureCard index={3} title="Clans" description="Create or join a clan and climb up the Clan Leaderboard with friends!">
          <Shield />
        </GameFeatureCard>
        <GameFeatureCard index={4} title="Leaderboards" description="Compete with other players and climb the global leaderboards to become the ultimate Toilet Defender.">
          <Trophy />
        </GameFeatureCard>
        <GameFeatureCard index={5} title="Limited Time Modes" description="Play on Limited Time Modes with friends for a more unique and fun experience!">
          <Gamepad2Icon />
        </GameFeatureCard>
      </div>
    </section>
  )
}

function CommunitySection() {
  return (
    <section className="container mx-auto px-4 md:px-6">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#5865F2] px-6 py-12 md:px-12 md:py-16 text-white">
        <SiDiscord className="absolute -right-10 -bottom-12 -z-10 size-64 text-white/10 rotate-12" />
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Join the community</h2>
          <p className="mt-3 text-white/80 md:text-lg">
            Get update news first, find trading partners, and hang out with other Toilet Defenders on Discord.
          </p>
          <Link
            href="/discord"
            target="_blank"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-[#5865F2] transition-transform hover:-translate-y-0.5"
          >
            <SiDiscord size={18} />
            Join our Discord
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="flex-1 flex flex-col gap-20 md:gap-28 pb-20 md:pb-28">
      <HomeBanner />

      <section id="latest-blog-post" className="container mx-auto px-4 md:px-6">
        <SectionHeading
          eyebrow="Dev Blog"
          title="Latest update"
          action={(
            <Link href="/blog" className="group inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground">
              All posts
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        />
        <LatestBlogPost />
      </section>

      <GameFeaturesSection />

      <CommunitySection />
    </main>
  )
}
