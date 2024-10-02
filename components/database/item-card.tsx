import Image from "next/image"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ItemProps {
  display: string
  imageURL: string
  rarity: string
  exists: number,
  inferredExists?: number | null
}

const abbreviateNumber = Intl.NumberFormat('en-US', {
  notation: "compact",
  maximumFractionDigits: 1
}).format;

export function ItemCard({ display: displayName, imageURL, rarity, exists, inferredExists }: ItemProps) {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex-grow p-4 pb-0">
        <CardTitle className="text-2xl font-bold text-center mb-2">{displayName}</CardTitle>
        <div className="flex-grow flex items-center justify-center">
          <Image
            src={imageURL}
            alt={displayName}
            width={200}
            height={200}
            className="w-64 h-fill aspect-square object-contain"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 mt-auto">
        <div className="grid grid-cols-2 gap-x-2 text-md">
          <span className="font-semibold">Rarity:</span>
          <span className="text-right">{rarity}</span>

          <span className="font-semibold">{inferredExists && "Ever Existed:" || "Exists:"}</span>
          <span className="text-right">{abbreviateNumber(exists)}</span>

          {inferredExists && <>
            <span className="font-semibold">Exists (Estimated):</span>
            <span className="text-right">{inferredExists >= 0 && abbreviateNumber(inferredExists) || "???"}</span>
          </>}
        </div>
      </CardContent>
    </Card>
  )
}