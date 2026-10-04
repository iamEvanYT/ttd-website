"use client"

import * as motion from "framer-motion/client"
import Image from "next/image"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { getRarityStyle } from "@/lib/rarity"
import { cn } from "@/lib/utils"

interface ItemProps {
  display: string
  imageURL: string
  rarity: string
  exists: number,
  shinyExists?: number,
  inferredExists?: number | null
}

const abbreviateNumber = Intl.NumberFormat('en-US', {
  notation: "compact",
  maximumFractionDigits: 1
}).format;

export function SkeletonItemCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string, value: string }) {
  return (
    <div className="min-w-0">
      <dt className="truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="font-display text-lg font-bold tabular-nums">{value}</dd>
    </div>
  )
}

export function ItemCard({ display: displayName, imageURL, rarity, exists, inferredExists, shinyExists }: ItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardInitialState = { y: 20, opacity: 0 }
  const cardAnimateState = { y: 0, opacity: 1 }

  const isJavaScriptEnabled = typeof window !== "undefined";
  const rarityStyle = getRarityStyle(rarity);

  return (
    <motion.div
      ref={ref}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
      initial={isJavaScriptEnabled && cardInitialState || cardAnimateState}
      animate={isInView && cardAnimateState}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
      }}
    >
      <div className={cn("relative aspect-square bg-gradient-to-b to-transparent", rarityStyle.glow)}>
        <div className="absolute inset-5">
          <Image
            src={imageURL}
            alt={displayName}
            fill={true}
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-display text-lg font-bold leading-tight tracking-tight">{displayName}</h3>
          <span className={cn("mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold", rarityStyle.badge)}>
            {rarity}
          </span>
        </div>
        <dl className="mt-auto grid grid-cols-2 gap-x-3 gap-y-2 border-t pt-3">
          <Stat label={inferredExists && "Ever Existed" || "Exists"} value={abbreviateNumber(exists)} />

          {inferredExists && (
            <Stat label="Exists (Est.)" value={inferredExists >= 0 && abbreviateNumber(inferredExists) || "???"} />
          )}

          {(shinyExists !== undefined) && (
            <Stat label="Shiny" value={abbreviateNumber(shinyExists)} />
          )}
        </dl>
      </div>
    </motion.div>
  )
}
