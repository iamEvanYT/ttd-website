"use server";

import { ExtendedItemData, ItemData, Rarity, SortingOptions, SortingOrder } from "./types";

export default async function Sort(results: (ItemData & ExtendedItemData)[], sortingOrder: SortingOrder, sortBy: SortingOptions): Promise<(ItemData & ExtendedItemData)[]> {
   switch (sortBy) {
      case SortingOptions.name:
         return SortByName(results, sortingOrder);

      case SortingOptions.existing_count:
         return SortByNumber(results, sortingOrder, "exists");

      case SortingOptions.rarity:
         return SortByRarity(results, sortingOrder);

      default:
         throw new Error(`Unhandled sorting option: ${(sortBy as SortingOptions).toString()}. Unable to sort!`);
   }
}

function SortByName(results: (ItemData & ExtendedItemData)[], sortingOrder: SortingOrder) {
   if (sortingOrder === SortingOrder.ascending) {
      return results.sort((a, b) => (a.display || "").localeCompare(b.display || ""));
   } else {
      return results.sort((a, b) => (b.display || "").localeCompare(a.display || ""));
   }
}

function SortByNumber(results: (ItemData & ExtendedItemData)[], sortingOrder: SortingOrder, propertyToCheck: keyof (ItemData & ExtendedItemData)) {
   if (sortingOrder === SortingOrder.ascending) {
      return results.sort((a, b) => (a[propertyToCheck] as number || 0) - (b[propertyToCheck] as number || 0));
   } else {
      return results.sort((a, b) => (b[propertyToCheck] as number || 0) - (a[propertyToCheck] as number || 0));
   }
}

function SortByRarity(results: (ItemData & ExtendedItemData)[], sortingOrder: SortingOrder) {
   if (sortingOrder === SortingOrder.ascending) {
      return results.sort((a, b) => 
        (Rarity[a.rarity as keyof typeof Rarity] || 0) - (Rarity[b.rarity as keyof typeof Rarity] || 0)
      );
   } else {
      return results.sort((a, b) => 
        (Rarity[b.rarity as keyof typeof Rarity] || 0) - (Rarity[a.rarity as keyof typeof Rarity] || 0)
      );
   }
}
