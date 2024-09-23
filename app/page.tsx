import { GameFeatureCard } from "@/components/game-feature-card"
import { Button } from "@/components/ui/button"
import { Shield, Trophy, Sparkles, Castle, Handshake } from "lucide-react"
import Link from "next/link"

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen text-gray-900">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-ghost-accent-color">
          <div className="container px-4 md:px-6">
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
                  <Button variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700">Play Now on Roblox</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
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
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
