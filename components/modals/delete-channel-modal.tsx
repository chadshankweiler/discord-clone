"use client"

import axios from "axios"
import { useState } from "react"
import qs from "query-string"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

import { useModal } from '@/hooks/use-modal-store'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"



// The part that is displayed onto the webpage

export const DeleteChannelModal = () => {


    // Create Server Modal
    const { type, isOpen, onClose, data } = useModal()
    const router = useRouter()

    const isModalOpen = isOpen && type === "deleteChannel"
    const { server, channel } = data

    const [isLoading, setIsLoading] = useState(false)

    const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
            serverId: server?.id 
        } 
    })

    const onClick = async () => {
        try {
            setIsLoading(false)

            await axios.delete(url)

            onClose()
            router.refresh()
            router.push(`/servers/${server?.id}`)
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
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to delete channel? <br/>
                        <span className="font-semibold text-indigo-500">#{channel?.name}</span> will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">    
                    <div className="flex items-center justify-between w-full">
                         <Button
                            disabled={isLoading}
                            onClick={onClose}
                            variant="ghost"
                            
                         >
                            Cancel
                         </Button>
                         <Button
                            disabled={isLoading}
                            onClick={onClick}
                            variant="primary"
                         >
                            Confirm
                         </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
