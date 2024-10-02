"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

type ItemSearchBarProps = {
  type: string;
  className?: string;
};

const typeDisplays: { [key: string]: string } = {
  Troops: "a unit",
  Crates: "a crate",
};
const fallbackTypeDisplay = "an item"

export default function ItemSearchBar({
  type,
  className,
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
    <Input
      className={cn("p-5 px-4", className)}
      placeholder={`Search for ${typeDisplays[type] || fallbackTypeDisplay}...`}
      value={query}
      onChange={handleChange}
    />
  );
}