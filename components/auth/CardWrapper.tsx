"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { BackButton } from "./BackButton";
import { Header } from "./header";
import { Social } from "./social";
interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonRef: string;
    showSocial?: boolean;
};
export const CardWrapper = ({ children, headerLabel, backButtonLabel, backButtonRef, showSocial }: CardWrapperProps) => {
    return (
        <Card className="w-[400]px shadow-md">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>

            )}
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonRef} />
            </CardFooter>
        </Card>
    )

}