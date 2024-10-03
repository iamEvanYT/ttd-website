"use client"

import Script from "next/script"

export function Umami() {
    const isJavaScriptEnabled = typeof window !== "undefined";
    if (process.env.NODE_ENV == "development" && isJavaScriptEnabled) {
        localStorage.setItem('umami.disabled', "1");
    }
    
    return <>
        <Script async src="https://umami.iamevan.dev/script.js" data-website-id="47d4dd0d-9720-4344-a304-c00c8d18564c" />
    </>
}