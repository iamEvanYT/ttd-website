"use client"

import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import * as motion from "framer-motion/client"
import { useInView } from "framer-motion";

export function GameFeatureCard({
    title,
    description,
    children
}: {
    title: string,
    description: string,
    children: React.ReactNode
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const cardInitialState = { x: 30, opacity: 0 }
    const cardAnimateState = { x: 0, opacity: 1 }

    const isJavaScriptEnabled = typeof window!== "undefined";

    return (
        <Card ref={ref} className="card-hover size-auto">
            <motion.div
                initial={isJavaScriptEnabled && cardInitialState || cardAnimateState}
                animate={isInView && cardAnimateState}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    delay: 0.05
                }}
            >
                <CardHeader>
                    {children}
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{description}</p>
                </CardContent>
            </motion.div>
        </Card>
    )
}