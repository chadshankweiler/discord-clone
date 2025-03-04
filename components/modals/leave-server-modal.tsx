"use client"

import axios from "axios"
import { useState } from "react"

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

export const LeaveServerModal = () => {

    // Create Server Modal
    const { type, isOpen, onClose, data } = useModal()
    const router = useRouter()

    const isModalOpen = isOpen && type === "leaveServer"
    const { server } = data

    const [isLoading, setIsLoading] = useState(false)

    const onClick = async () => {
        try {
            setIsLoading(false)

            await axios.patch(`/api/servers/${server?.id}/leave`)

            onClose()
            router.refresh()
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
                        Leave Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to leave <span className="font-semibold text-indigo-500">{server?.name}</span>?
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