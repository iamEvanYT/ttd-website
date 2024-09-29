import { GameFeatureCard } from "@/components/custom/game-feature-card"
import { LatestBlogPost } from "@/components/ghost/latest-blog-post"
import { Button } from "@/components/ui/button"
import { BANNER_IMAGE } from "@/configuration"
import { Shield, Trophy, Sparkles, Castle, Handshake, Gamepad2Icon } from "lucide-react"
import Link from "next/link"

export const revalidate = 60;

function GameFeaturesSection() {
  return (
    <section id="features" className="w-full pb-6 md:pb-12 lg:pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 dark:text-white">Game Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <GameFeatureCard title="Strategic Defense" description="Place cameramen and other units to defend the tower against toilets!">
            <Castle className="w-8 h-8 mb-2 text-blue-600 dark:text-blue-400" />
          </GameFeatureCard>
          <GameFeatureCard title="Summon Units" description="Earn coins by winning matches, and summon more powerful units using coins!">
            <Sparkles className="w-8 h-8 mb-2 text-blue-600 dark:text-blue-400" />
          </GameFeatureCard>
          <GameFeatureCard title="Trading" description="Trade to get unobtainable units from other players!">
            <Handshake className="w-8 h-8 mb-2 text-blue-600 dark:text-blue-400" />
          </GameFeatureCard>

          <GameFeatureCard title="Clans" description="Create or join a clan and climb up the Clan Leaderboard with friends!">
            <Shield className="w-8 h-8 mb-2 text-blue-600 dark:text-blue-400" />
          </GameFeatureCard>
          <GameFeatureCard title="Leaderboards" description="Compete with other players and climb the global leaderboards to become the ultimate Toilet Defender.">
            <Trophy className="w-8 h-8 mb-2 text-blue-600 dark:text-blue-400" />
          </GameFeatureCard>
          <GameFeatureCard title="Limited Time Modes" description="Play on Limited Time Modes with friends for a more unique and fun experience!">
            <Gamepad2Icon className="w-8 h-8 mb-2 text-blue-600 dark:text-blue-400" />
          </GameFeatureCard>
        </div>
      </div>
    </section>
  )
}

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen text-gray-900">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative bg-ghost-accent-color">
          <div
            className="absolute inset-0 bg-cover bg-top z-0"
            style={{ backgroundImage: `url('${BANNER_IMAGE}')` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

          <div className="container mx-auto px-4 md:px-6 relative z-20">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Toilet Tower Defense
                </h1>
                <br />
                <p className="mx-auto max-w-[700px] text-white md:text-xl">
                  Place cameramen and other units to fight back against the invading toilets!
                  <br />
                  Beat waves to win, or play in the endless game mode!
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/game" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-8 py-3 h-10 text-lg font-semibold transition duration-500 ease-in-out transform hover:-translate-y-px hover:scale-110">Play Now on Roblox</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="pt-6 md:pt-12 lg:pt-16"></div>

        <section id="latest-blog-post" className="w-full pb-6 md:pb-12 lg:pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 dark:text-white">Latest Blog Post</h2>
            <div>
              <LatestBlogPost />
            </div>
          </div>
        </section>

        <GameFeaturesSection />

        <div className="pb-6 md:pb-12 lg:pb-16"></div>
      </main>
    </div >
  )
}
