"use client"

import { Button } from "@/components/ui/button"
import { BANNER_IMAGE } from "@/configuration"
import Link from "next/link"
import * as motion from "framer-motion/client"
import Image from "next/image"

export function HomeBanner() {
    const cardInitialState = { y: 10, opacity: 0 }
    const cardAnimateState = { y: 0, opacity: 1 }

    const isJavaScriptEnabled = typeof window !== "undefined";

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative bg-ghost-accent-color">
            <div className="absolute inset-0 z-0">
                <Image
                    src={BANNER_IMAGE}
                    alt="Banner background"
                    fill={true}
                    className="object-cover object-top"
                    priority
                />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-20">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <motion.div
                            initial={isJavaScriptEnabled && cardInitialState || cardAnimateState}
                            animate={cardAnimateState}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 20,
                            }}
                        >
                            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                                Toilet Tower Defense
                            </h1>
                        </motion.div>
                        <br />
                        <motion.div
                            initial={isJavaScriptEnabled && cardInitialState || cardAnimateState}
                            animate={cardAnimateState}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 20,
                                delay: 0.05,
                            }}
                        >
                            <p className="mx-auto max-w-[700px] text-white md:text-xl">
                                Place cameramen and other units to fight back against the invading toilets!
                                <br />
                                Beat waves to win, or play in the endless game mode!
                            </p>
                        </motion.div>
                    </div>
                    <div className="space-x-4">
                        <motion.div
                            initial={isJavaScriptEnabled && cardInitialState || cardAnimateState}
                            animate={cardAnimateState}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 20,
                                delay: 0.10,
                            }}
                        >
                            <Link href="/game" target="_blank" rel="noopener noreferrer">
                                <Button variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-8 py-3 h-10 text-lg font-semibold transition duration-500 ease-in-out transform hover:-translate-y-px hover:scale-110">Play Now on Roblox</Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}