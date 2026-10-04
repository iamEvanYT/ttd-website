"use client"

import React, { useRef } from "react";
import * as motion from "framer-motion/client"
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export function GameFeatureCard({
    title,
    description,
    className,
    index = 0,
    children
}: {
    title: string,
    description: string,
    className?: string,
    index?: number,
    children: React.ReactNode
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const cardInitialState = { y: 24, opacity: 0 }
    const cardAnimateState = { y: 0, opacity: 1 }

    const isJavaScriptEnabled = typeof window !== "undefined";

    return (
        <motion.div
            ref={ref}
            className={cn(
                "group relative overflow-hidden rounded-2xl border bg-card p-5 md:p-8 transition-colors hover:border-primary/40",
                className
            )}
            initial={isJavaScriptEnabled && cardInitialState || cardAnimateState}
            animate={isInView && cardAnimateState}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                delay: 0.05 * index
            }}
        >
            <div className="absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="mb-4 md:mb-6 grid size-11 md:size-12 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform group-hover:scale-110 [&_svg]:size-6">
                {children}
            </div>
            <h3 className="font-display text-xl font-bold tracking-tight">{title}</h3>
            <p className="mt-2 text-muted-foreground">{description}</p>
        </motion.div>
    )
}
