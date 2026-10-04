"use client"

import { useEffect } from "react";
import { LoadingSpinner } from "../ui/loading";

export default function Redirection({
    url: REDIRECT_URL
}: {
    url: string,
}) {
    useEffect(() => {
        window.location.replace(REDIRECT_URL)
    }, [REDIRECT_URL])

    return <>
        <main className="flex flex-1 flex-col items-center justify-center gap-4 py-24">
            <LoadingSpinner className="size-8 text-primary" />
            <h1 className="font-display text-2xl font-bold">Redirecting...</h1>
        </main>
        <meta httpEquiv="refresh" content={`0.5; url=${REDIRECT_URL}`} />
    </>
}
