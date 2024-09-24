import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function GameFeatureCard({
    title,
    description,
    children
}: {
    title: string,
    description: string,
    children: React.ReactNode
}) {
    return (
        <Card className="card-hover size-auto">
            <CardHeader>
                {children}
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{description}</p>
            </CardContent>
        </Card>
    )
}