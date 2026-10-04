// Accent classes per rarity, written out in full so Tailwind picks them up
const rarityStyles: Record<string, { badge: string, glow: string }> = {
    Basic: { badge: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-300", glow: "from-zinc-500/20" },
    Uncommon: { badge: "bg-green-500/15 text-green-700 dark:text-green-300", glow: "from-green-500/20" },
    Rare: { badge: "bg-sky-500/15 text-sky-700 dark:text-sky-300", glow: "from-sky-500/25" },
    Epic: { badge: "bg-violet-500/15 text-violet-700 dark:text-violet-300", glow: "from-violet-500/25" },
    Legendary: { badge: "bg-amber-500/15 text-amber-700 dark:text-amber-300", glow: "from-amber-500/25" },
    Mythic: { badge: "bg-rose-500/15 text-rose-700 dark:text-rose-300", glow: "from-rose-500/25" },
    Godly: { badge: "bg-yellow-400/20 text-yellow-700 dark:text-yellow-300", glow: "from-yellow-400/30" },
    Exclusive: { badge: "bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300", glow: "from-fuchsia-500/25" },
    Celestial: { badge: "bg-cyan-400/15 text-cyan-700 dark:text-cyan-300", glow: "from-cyan-400/30" },
    Ultimate: { badge: "bg-red-500/15 text-red-700 dark:text-red-300", glow: "from-red-500/30" },
};

const fallbackStyle = { badge: "bg-primary/10 text-primary", glow: "from-primary/20" };

export function getRarityStyle(rarity: string) {
    return rarityStyles[rarity] ?? fallbackStyle;
}
