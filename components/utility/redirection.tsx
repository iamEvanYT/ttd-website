"use client"

import { useEffect } from "react";
import { LoadingSpinner } from "../ui/loading";

export default async function Redirection({
    url: REDIRECT_URL
}: {
    url: string,
}) {
    useEffect(() => {
        window.location.replace(REDIRECT_URL)
    }, [])

    return <>
        <div className="flex flex-col items-center">
            <h1 className="w-full text-center my-5 font-bold text-2xl">Redirecting...</h1>
            <LoadingSpinner />
        </div>
        <meta httpEquiv="refresh" content={`0.5; url=${REDIRECT_URL}`} />
    </>
}