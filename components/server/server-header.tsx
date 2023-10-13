"use client"

import { MemberRole } from "@prisma/client"
import { ServerWithMembersWithProfiles } from "@/types"

import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useModal } from "@/hooks/use-modal-store"


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"

import { Label } from "../ui/label"
import { Input } from "../ui/input"

interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles
    role?: MemberRole
}

export const ServerHeader = ({
    server,
    role
}: ServerHeaderProps) => {
    const { onOpen } = useModal()

    const isAdmin = role === MemberRole.ADMIN
    const isModerator = isAdmin || role === MemberRole.MODERATOR


    return (
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger
                    className="focus:outline-none"
                    asChild
                >
                    <button
                        className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                    >
                        {server.name}
                        <ChevronDown className="w-5 h-5 ml-auto"/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]"
                >
                    {isModerator && (
                        <DropdownMenuItem
                            onClick={() => {
                                onOpen("invite", { server })
                            }}
                            className="text-indigo-600 dark:text-indigo-400 text-sm py-2 px-3 cursor-pointer"
                        >
                            Invite People
                            <UserPlus 
                                className="ml-auto h-4 w-4"
                            />
                        </DropdownMenuItem>
                    )}
                    {isAdmin && (
                        <DropdownMenuItem
                            onClick={() => onOpen("editServer", { server })}
                            className="text-sm py-2 px-3 cursor-pointer"
                        >
                            Server Setting
                            <Settings 
                                className="ml-auto h-4 w-4"
                            />
                        </DropdownMenuItem>
                    )}
                    {isAdmin && (
                        <DropdownMenuItem
                            onClick={() => onOpen("members", { server })}
                            className="text-sm py-2 px-3 cursor-pointer"
                        >
                            Manage Members
                            <Users 
                                className="ml-auto h-4 w-4"
                            />
                        </DropdownMenuItem>
                    )}
                    {isModerator && (
                        <DropdownMenuItem
                            onClick={() => onOpen("createChannel")}
                            className="text-sm py-2 px-3 cursor-pointer"
                        >
                            Create Channel
                            <PlusCircle 
                                className="ml-auto h-4 w-4"
                            />
                        </DropdownMenuItem>
                    )}
                    {isModerator && (
                        <DropdownMenuSeparator />
                    )}
                    {isModerator && (
                        <DropdownMenuItem
                            onClick={() => onOpen("deleteServer", { server })}
                            className="text-rose-500 text-sm py-2 px-3 cursor-pointer"
                        >
                            Delete Server
                            <Trash 
                                className="ml-auto h-4 w-4"
                            />
                        </DropdownMenuItem>
                    )}
                    {!isAdmin && (
                        <DropdownMenuItem
                            onClick={() => onOpen("leaveServer", { server })}
                            className="text-rose-500 text-sm py-2 px-3 cursor-pointer"
                        >
                            Leave Server
                            <LogOut 
                                className="ml-auto h-4 w-4"
                            />
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
    )
}