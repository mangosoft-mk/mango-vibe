import Image from 'next/image';
import {useState, useEffect} from 'react';

const ShimmerMessage = () => {
    const messages = [
        'Thinking...',
        'Loading...',
        'Generating...',
        'Analyzing your request...',
        'Building your request...',
        'Crafting components...',
        'Optimizing...',
        'Adding final touches...',
        'Almost ready'
    ];
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prev) => (prev + 1)%messages.length);
        },2000)

        return () => clearInterval(interval);
    },[messages.length]);

    return (
        <div className='flex items-center gap-2'>
            <span className="text-base text-muted-foreground animate-pulse">
                {messages[currentMessageIndex]}
            </span>
        </div>
    )

}
export const MessageLoading = () =>{
    return (
        <div className='flex flex-col group px-2 pb-4'>
            <div className='flex items-center gap-2 pl-2 mb'>
                <Image src='/logo.svg' alt='MangoVibe'
                height={18} width={18} className='shrink-0' />
                <span className='text-sm font-medium'>MangoVibe</span>
            </div>
            <div className='flex pl-8.5 flex-col gap-y-4'>
                <ShimmerMessage />
            </div>
        </div>
    )
};