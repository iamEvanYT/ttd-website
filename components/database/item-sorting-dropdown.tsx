"use client";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";

import { SortingOptions, SortingOrder } from "@/lib/ttd-api/types";


type ItemSortingDropdownProps = {
   children: React.ReactNode,

   
  SortingOrderState: [SortingOrder, React.Dispatch<React.SetStateAction<SortingOrder>>]
  SortingOptionsState: [SortingOptions, React.Dispatch<React.SetStateAction<SortingOptions>>]
}

export default function ItemSortingDropdown({
   children,

  SortingOptionsState,
  SortingOrderState
} : ItemSortingDropdownProps) {
   const [sortingOrder, setSortingOrder] = SortingOrderState;
   const [sortingOption, setSortingOption] = SortingOptionsState;

   const sortingOrderArrow = sortingOrder === SortingOrder.ascending ? "↑" : "↓";

   const onSelect = (key: string) => {
      if (key === SortingOptions[sortingOption]) 
         // if the user selected the current sorting option, switch the sortingOrder
         return setSortingOrder(sortingOrder === SortingOrder.ascending ? SortingOrder.descending : SortingOrder.ascending); 
      
      return setSortingOption(SortingOptions[key as keyof typeof SortingOptions]);
   };


   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
         
         <DropdownMenuContent>
            <DropdownMenuLabel>Sorting</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {Object.keys(SortingOptions).filter((v) => isNaN(Number(v))).map((key) => (
               <DropdownMenuItem key={key} onSelect={() => onSelect(key)} className={cn(SortingOptions[sortingOption] === key ? "bg-zinc-800" : "")}>
                  {sortingOrderArrow} {key
                     .replace("_", " ")
                     .split(" ")
                     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                     .join(" ")} {/* Makes the key automaticly upper case and spaced out */}
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}