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
        return <div className="text-center">
            No Summons Found!
        </div>;
    }

    return (
        <div className="align-baseline flex justify-center p-10">
            <Accordion type="single" collapsible className="w-full">
                {
                    summons.map(summon => {
                        const {
                            id,
                            display: displayName,
                            displayPrice,
                            items
                        } = summon;

                        return (
                            <AccordionItem key={id} value={id}>
                                <AccordionTrigger className="font-bold">{displayName}</AccordionTrigger>
                                <AccordionContent className="flex flex-col">
                                    <span className="flex flex-row gap-1">
                                        <div className="font-bold">Cost:</div>
                                        {displayPrice}
                                    </span>
                                    <div className="py-2" />

                                    <span className="flex flex-col gap-1">
                                        <div className="font-bold text-lg">Items:</div>
                                        <div className="flex flex-col gap-2">
                                            {items && items.map((item) => {
                                                const chanceText = `${item.chance}%`

                                                const itemId = (item as ExtendedItemData).id || item.chance
                                                const itemDisplay = (item as ExtendedItemData).display || "???"

                                                const lineElement = <span key={itemId}>{chanceText} - {itemDisplay}</span>
                                                if ((item as ExtendedItemData).id) {
                                                    return (
                                                        <Link href={`/database/units/${itemId}`} key={itemId} className="hover:underline underline-offset-4">
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