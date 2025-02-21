"use client";

import dynamic from "next/dynamic";
import Script from "next/script";
import Head from "next/head";

function RawUmami() {
  const isJavaScriptEnabled = typeof window !== "undefined";
  if (process.env.NODE_ENV == "development" && isJavaScriptEnabled) {
    localStorage.setItem("umami.disabled", "1");
  }

  return (
    <>
      <Head>
        <meta
          key="google-site-verification"
          name="google-site-verification"
          content="_T_uCzHE2rHJXjbxQsykmoh8UOcKZipZSQKm9mKHa5g"
        />
      </Head>
      <Script
        async
        src="https://umami.iamevan.dev/script.js"
        data-website-id="47d4dd0d-9720-4344-a304-c00c8d18564c"
      />
    </>
  );
}

export const Umami = dynamic(async () => RawUmami, {
  ssr: false,
});

function RawClarity() {
  return (
    <>
      <Script id="clarity-script" strategy="afterInteractive">
        {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ovnnymdqp6");
            `}
      </Script>
    </>
  );
}

export const Clarity = dynamic(async () => RawClarity, {
  ssr: false,
});
