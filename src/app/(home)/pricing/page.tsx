"use client";

import Image from "next/image";
import {PricingTable} from "@clerk/nextjs";
import {useCurrentTheme} from "@/hooks/use-current-theme";
import {dark} from "@clerk/themes";

const Page = () => {
    const currentTheme = useCurrentTheme();

    return (
        <div className="flex flex-col max-w-3xl mx-auto w-full">
            <section className="space-y-6 pt-[16vh] 2xl:pt-48">
                <div className="flex flex-col items-center">
                    <Image src="/logo.svg" alt="MangoVibe" width={50} height={50} />
                </div>
                <h1 className="text-xl md:text-3xl font-bolc text-center">Pricing</h1>
                <p className="text-muted-foreground text-center text-sm md:text-base">
                    Choose the plan the fits you needs
                </p>
                <PricingTable
                    appearance={{
                        elements:{
                            pricingTableCard:"border! shadow-none! rounded-lg!",
                            baseTheme: currentTheme === 'dark' ? dark : undefined,
                        }
                    }}
                />
            </section>
        </div>
    );
}

export default Page;