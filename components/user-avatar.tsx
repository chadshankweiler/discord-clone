"use client"


import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface UserAvatarProps {
    src?: string
    className?: string
}

export const UserAvatar = ({
    src,
    className
}: UserAvatarProps) => {
    return (
        <Avatar className={cn(
            "h-2 md:h-10 md:w-10",
            className
        )}>
            <AvatarImage src={src}/>
            <AvatarFallback>C</AvatarFallback>
        </Avatar>
    )
}
