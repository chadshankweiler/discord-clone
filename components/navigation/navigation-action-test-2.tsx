"use client"

import { Check, Plus, Shield, ShieldQuestion } from "lucide-react"
import { ActionToolTip } from "@/components/action-tooltips"
import { useModal } from "@/hooks/use-modal-store"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu"


export const NavigationActionTestTwo = () => {


  return (
    <div>
        <Dialog >
            <DropdownMenu>
                <DropdownMenuTrigger>click</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Open</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DialogTrigger asChild>
                        <DropdownMenuItem>
                        <span>Delete</span>
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <ShieldQuestion className="h-4 w-4 text-zinc-400 mr-2"/>
                            <span>Role</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <Shield className="h-4 w-4 mr-2"/>
                                    Guest
                                    
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Shield className="h-4 w-4 mr-2"/>
                                    Moderator

                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
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
            </DialogContent>
        </Dialog>
    </div>
  )
}
