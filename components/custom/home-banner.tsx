"use client"

import { BANNER_IMAGE } from "@/configuration"
import Link from "next/link"
import * as motion from "framer-motion/client"
import Image from "next/image"
import { ArrowRight, Play } from "lucide-react"

export function HomeBanner() {
    const cardInitialState = { y: 16, opacity: 0 }
    const cardAnimateState = { y: 0, opacity: 1 }

    const isJavaScriptEnabled = typeof window !== "undefined";

    const transition = (delay: number) => ({
        type: "spring" as const,
        stiffness: 150,
        damping: 20,
        delay,
    })

    return (
        <section className="px-3 md:px-4">
            <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand min-h-[560px] md:min-h-[640px] flex items-end">
                <Image
                    src={BANNER_IMAGE}
                    alt="Banner background"
                    fill={true}
                    className="-z-20 object-cover object-top"
                    priority
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/55 to-black/10 md:via-black/40" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

                <div className="container mx-auto px-6 md:px-12 pb-12 md:pb-16">
                    <div className="max-w-2xl space-y-6">
                        <motion.div
                            initial={isJavaScriptEnabled && cardInitialState || cardAnimateState}
                            animate={cardAnimateState}
                            transition={transition(0)}
                        >
                            <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tighter text-white sm:text-6xl lg:text-7xl">
                                Toilet Tower Defense
                            </h1>
                        </motion.div>
                        <motion.div
                            initial={isJavaScriptEnabled && cardInitialState || cardAnimateState}
                            animate={cardAnimateState}
                            transition={transition(0.05)}
                        >
                            <p className="max-w-xl text-lg text-white/80 md:text-xl">
                                Place cameramen and other units to fight back against the invading toilets.
                                Beat waves to win, or play in the endless game mode!
                            </p>
                        </motion.div>
                        <motion.div
                            className="flex flex-wrap gap-3"
                            initial={isJavaScriptEnabled && cardInitialState || cardAnimateState}
                            animate={cardAnimateState}
                            transition={transition(0.1)}
                        >
                            <Link
                                href="/game"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-base font-semibold text-black shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5"
                            >
                                <Play className="h-4 w-4 fill-current" />
                                Play Now on Roblox
                            </Link>
                            <Link
                                href="/database"
                                className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
                            >
                                Explore the Database
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
