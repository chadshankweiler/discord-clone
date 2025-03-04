"use client"

import axios from "axios"
import { useState } from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

import { useModal } from '@/hooks/use-modal-store'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, Copy, RefreshCw } from "lucide-react"
import { useOrigin } from "@/hooks/use-origin"


// The part that is displayed onto the webpage

export const InviteModal = () => {

    // Create Server Modal
    const { onOpen, type, isOpen, onClose, data } = useModal()
    const origin = useOrigin()

    const isModalOpen = isOpen && type === "invite"
    const { server } = data

    const [copied, setCopied] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }

    const onNew = async () => {
        try {
            setIsLoading(true)
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)

            onOpen("invite", { server: response.data})
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black overflow-hidden p-0">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Customize your server
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server Invite Link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input 
                            disabled={isLoading}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            value={inviteUrl}
                            readOnly
                        />
                        <Button disabled={isLoading} size="icon">
                            {copied ? <Check className="w-4 h-4" /> : <Copy onClick={onCopy} className="w-4 h-4"/>}
                            
                        </Button>
                    </div>
                    <Button
                        onClick={onNew}
                        disabled={isLoading}
                        variant="link"
                        size="sm"
                        className="text-xs text-zinc-500 mt-4"
                    >
                        Generate New Link
                        <RefreshCw 
                            className="h-4 w-4 ml-4"
                        />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}