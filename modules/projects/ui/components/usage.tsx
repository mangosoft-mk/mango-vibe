import {formatDuration, intervalToDuration} from "date-fns";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {CrownIcon} from "lucide-react";
import {useAuth} from "@clerk/clerk-react";
import {useMemo} from "react";

interface Props {
    points:number;
    msBeforeNext:number;
}

export const Usage=({points, msBeforeNext}:Props) => {
    const {has} = useAuth();
    const hasProAccess = has?.({plan:"pro"});

    const resetTime = useMemo(()=>{
        try {
            return formatDuration(
                intervalToDuration({
                    start: new Date(),
                    end: new Date(Date.now()+msBeforeNext),
                }),
                {
                    format:["months","days","hours"]
                }
            )
        }catch(e){
            console.error("Error formating duration",e);
            return "unknown time";
        }
    },[msBeforeNext]);
    return (
        <div className="rounder-t-xl bg-background border border-b-0 p-2.5">
            <div className="flex itemx-center gap-x-2">
                <div>
                    <p className="text-sm">
                        {points} {hasProAccess ? "": "free"} credits remaining
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {resetTime}
                    </p>
                </div>
                {!hasProAccess && (
                    <Button asChild size="sm" variant="outline" className="ml-auto">
                        <Link href="/pricing">
                            <CrownIcon /> Upgrade
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    )
}