"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { FilterIcon, SearchIcon } from "lucide-react";
import ItemSortingDropdown from "./item-sorting-dropdown";
import { SortingOptions, SortingOrder } from "@/lib/ttd-api/types";


type ItemSearchBarProps = {
  type: string;
  className?: string;

  SortingOrderState: [SortingOrder, React.Dispatch<React.SetStateAction<SortingOrder>>]
  SortingOptionsState: [SortingOptions, React.Dispatch<React.SetStateAction<SortingOptions>>]
};

const typeDisplays: { [key: string]: string } = {
  Troops: "a unit",
  Crates: "a crate",
};
const fallbackTypeDisplay = "an item"

export default function ItemSearchBar({
  type,
  className,

  SortingOptionsState,
  SortingOrderState
}: ItemSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  

  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      const url = new URL(window.location.href);
      if (query) {
        url.searchParams.set("q", query);
      } else {
        url.searchParams.delete("q");
      }
      router.push(url.href);
    }, 200); // 200 milliseconds debounce

    // Cleanup the timeout if query changes before 300ms
    return () => {
      clearTimeout(handler);
    };
  }, [query, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={cn("flex flex-row h-12 gap-2", className)}>
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="h-full rounded-full bg-card pl-11 pr-4 text-base shadow-sm"
          placeholder={`Search for ${typeDisplays[type] || fallbackTypeDisplay}...`}
          value={query}
          onChange={handleChange}
        />
      </div>

      <div>
        <ItemSortingDropdown SortingOptionsState={SortingOptionsState} SortingOrderState={SortingOrderState}>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full bg-card"
            aria-label="Filter"
          >
            <FilterIcon className="h-4 w-4" />
          </Button>
        </ItemSortingDropdown>
      </div>
    </div>
  );
}