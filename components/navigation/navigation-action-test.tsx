"use client"

import { Plus } from "lucide-react"
import { ActionToolTip } from "@/components/action-tooltips"
import { useModal } from "@/hooks/use-modal-store"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from "../ui/dropdown-menu"


export const NavigationActionTest = () => {

    const { data, onOpen, onClose} = useModal()


  return (
    <div>
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger>click</DropdownMenuTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Open</DropdownMenuItem>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DialogTrigger asChild>
                            <DropdownMenuItem>
                            <span>Delete</span>
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogTrigger asChild>
                            <DropdownMenuItem>
                            <span>test</span>
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogTrigger asChild>
                            <DropdownMenuItem onClick={() => onOpen("createChannel")}>
                            <span>Delete</span>
                            </DropdownMenuItem>
                        </DialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenuPortal>
            </DropdownMenu>

            {/* <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. Are you sure you want to permanently
                    delete this file from our servers?
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                <Button type="submit">Confirm</Button>
                </DialogFooter>
            </DialogContent> */}
        </Dialog>
    </div>
  )
}
