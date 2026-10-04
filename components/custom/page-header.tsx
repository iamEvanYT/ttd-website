export function PageHeader({
    eyebrow,
    title,
    description,
    className,
    children,
}: {
    eyebrow?: string,
    title: string,
    description?: string,
    className?: string,
    children?: React.ReactNode,
}) {
    return (
        <section className={className}>
            {/*
              The section is deliberately not positioned, so this backdrop is placed against <body>:
              it starts at the very top of the page (behind the topbar and any sub-navigation)
              and fades out gradually behind the content that follows.
            */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[56rem] overflow-hidden">
                <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_100%_at_50%_0%,black_25%,transparent_100%)]" />
                <div className="absolute left-1/2 top-24 h-72 w-[48rem] max-w-full -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
            </div>
            <div className="container mx-auto px-4 md:px-6 pt-12 pb-10 md:pt-20 md:pb-14 text-center">
                {eyebrow && (
                    <p className="mb-4 inline-flex items-center rounded-full border bg-card/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur">
                        {eyebrow}
                    </p>
                )}
                <h1 className="font-display text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
                    {title}
                </h1>
                {description && (
                    <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
                        {description}
                    </p>
                )}
                {children}
            </div>
        </section>
    );
}
