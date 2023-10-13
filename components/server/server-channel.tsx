"use client"

import { cn } from "@/lib/utils"
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client"
import { Edit, Hash, Lock, LockIcon, Mic, Trash, Video } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ActionToolTip } from "../action-tooltips"
import { useModal } from "@/hooks/use-modal-store"

interface ServerChannelProps {
    server: Server
    channel: Channel
    role?: MemberRole
}

const iconMap = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Mic, 
    [ChannelType.VIDEO]: Video,
}

export const ServerChannel = ({
    server,
    channel,
    role
}: ServerChannelProps) => {
    const { onOpen } = useModal()
    const router = useRouter()
    const params = useParams()

    const Icon = iconMap[channel.type]

    return (
    <button
        onClick={() => {}}
        className={cn(
            "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
            params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
        )}
    >
        <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-500"/>
        <p className={cn(
               "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
               params?.id === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
            )}
        >
            {channel.name}
        </p>
        {channel.name !== "general" && role !== MemberRole.GUEST && (
            <div className="ml-auto flex items-center gap-x-2">
                <ActionToolTip label="Edit">
                    <Edit 
                    onClick={() => onOpen("editChannel", { server, channel })}
                    className="hidden group-hover:block h-4 w-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                    />   
                </ActionToolTip>
                <ActionToolTip label="Delete">
                    <Trash 
                    onClick={() => onOpen("deleteChannel", { server, channel })}
                    className="hidden group-hover:block h-4 w-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                    />   
                </ActionToolTip>
            
            </div>
        )}
        {channel.name === "general" && (
            <Lock className="ml-auto flex items-center h-4 w-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"/>
        )}
    </button>
    )

}
