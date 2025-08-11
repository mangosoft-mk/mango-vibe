"use client";

import {useTRPC} from "@/trpc/client";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {useRouter} from "next/navigation";


export const Client = () =>{
    const router = useRouter();
    const trpc = useTRPC();
    // const {data:messages} = useQuery(trpc.messages.getMany.queryOptions());
    const createProject =
        useMutation(trpc.projects.create
            .mutationOptions({
                onError: (error) => {
                    toast.error(error.message);
                },
                onSuccess: (data) => {
                    toast.success('Message created')
                    router.push(`/projects/${data.id}`)
                }
    }));

    const [value, setValue] = useState("");


    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="max-w-7xl mx-auto flex items-center flex-col gap-y-4 justify-center">
                <Input value={value} onChange={e => setValue(e.target.value)} placeholder="Laravel and Vue app generator ..."/>

                <div className="p-4 mx-auto text-right">
                    <Button disabled={createProject.isPending} onClick={() => createProject.mutate({value: value})} className="w-100">
                        Generate the code
                    </Button>
                </div>
            </div>
            {/*{JSON.stringify(messages, null ,2)}*/}
        </div>
    )
}