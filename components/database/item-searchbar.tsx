"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

type ItemSearchBarProps = {
   type: string,
   className?: string,
}

export default function ItemSearchBar ({
   type,
   className
} : ItemSearchBarProps) {
   const router = useRouter();
   const searchParams = useSearchParams();

   const onChange = (i: React.ChangeEvent<HTMLInputElement>) => {
      const url = new URL(window.location.href);
      url.searchParams.set("q", i.target.value);
      router.push(url.href);
   }

   return (
      <Input 
         className={cn("p-5 px-4", className)}
         placeholder={`Search for ${type.toLocaleLowerCase()}...`}
         defaultValue={searchParams.get("q") || ""}

         onChange={(i) => onChange(i)}
      />
   )
}