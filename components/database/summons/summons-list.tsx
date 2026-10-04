import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { getSummons } from "@/lib/ttd-api/client-api"
import { ExtendedItemData } from "@/lib/ttd-api/types";
import Link from "next/link";

export async function SummonsList() {
    const summons = await getSummons();
    if (!summons) {
        return <div className="container mx-auto px-4 md:px-6 pb-20 text-center text-muted-foreground">
            No Summons Found!
        </div>;
    }

    return (
        <div className="container mx-auto max-w-3xl px-4 md:px-6 pb-20">
            <Accordion type="single" collapsible className="w-full space-y-3">
                {
                    summons.map(summon => {
                        const {
                            id,
                            display: displayName,
                            displayPrice,
                            items
                        } = summon;

                        return (
                            <AccordionItem key={id} value={id} className="rounded-2xl border bg-card px-5 data-[state=open]:border-primary/40">
                                <AccordionTrigger className="font-display text-lg font-bold hover:no-underline">{displayName}</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4">
                                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                                        <span className="font-semibold">Cost</span>
                                        {displayPrice}
                                    </span>

                                    <span className="flex flex-col gap-2">
                                        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Items</div>
                                        <div className="flex flex-col divide-y rounded-xl border">
                                            {items && items.map((item) => {
                                                const chanceText = `${item.chance}%`

                                                const itemId = (item as ExtendedItemData).id || item.chance
                                                const itemDisplay = (item as ExtendedItemData).display || "???"

                                                const lineElement = (
                                                    <span key={itemId} className="flex items-center justify-between gap-4 px-4 py-2.5">
                                                        <span>{itemDisplay}</span>
                                                        <span className="font-semibold tabular-nums">{chanceText}</span>
                                                    </span>
                                                )
                                                if ((item as ExtendedItemData).id) {
                                                    return (
                                                        <Link href={`/database/units/${itemId}`} key={itemId} className="transition-colors first:rounded-t-xl last:rounded-b-xl hover:bg-accent">
                                                            {lineElement}
                                                        </Link>
                                                    )
                                                } else {
                                                    return lineElement
                                                }
                                            })}
                                            {!items && "No items found!"}
                                        </div>
                                    </span>
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })
                }
            </Accordion>
        </div>
    )
}