"use client"

import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from 'axios'


import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from 'next/navigation'
import { useModal } from '@/hooks/use-modal-store'
import { ChannelType } from '@prisma/client'
import qs from 'query-string'
import { useEffect } from 'react'


// Form Validation checking the name and imageURL with min 1 character and a custom error message

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Channel name is required"
    }).refine(
        name => name !== "general",
        {
            message: "Channel name cannot be 'general'"
        }
    ),
    type: z.nativeEnum(ChannelType)
})

// The part that is displayed onto the webpage

export const CreateChannelModal = () => {

    // Create Server Modal
    const { type, isOpen, onClose, data } = useModal()

    const { channelType } = data

    const router = useRouter()
    const params = useParams()

    const isModalOpen = isOpen && type === "createChannel"

    // Define my form using react hook form
    const form = useForm({
        // connected to zod for validation
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: channelType || ChannelType.TEXT
        }
    })

    useEffect(() => {
       if (channelType) {
            form.setValue("type", channelType)
        } else {
            form.setValue("type", ChannelType.TEXT)
        } 
    }, [channelType, form])


    // react-hook-state method returning boolean value 
    const isLoading = form.formState.isSubmitting;

    // Define submit handler
    // extracting the infered type
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: "/api/channels",
                query: {
                    serverId: params?.serverId
                }
            })

            await axios.post(url, values)

            form.reset()
            router.refresh()
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose = () => {
        form.reset()
        onClose()
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black overflow-hidden p-0">

                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Create Channel
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-8 px-6">
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                                            Channel Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled={isLoading}
                                                className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                                                placeholder='Enter Channel Name'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        <FormField 
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Channel Type
                                    </FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger
                                                className='bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none'
                                            >
                                                <SelectValue 
                                                    placeholder="Select Channel Type"
                                                /> 
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {/* {Object.values(ChannelType).map((type) => (
                                                    <SelectItem
                                                        key={type}
                                                        value={type}
                                                        className='capitalize'
                                                        onSelect={() => console.log(type)}
                                                        onClick={() => console.log(type)}
                                                    >
                                                        {type.toLowerCase()}
                                                    </SelectItem>
                                            ))} */}
                                            <SelectItem
                                                key="TEXT"
                                                value='TEXT'
                                                className='capitalize'
                                            >
                                                Text
                                            </SelectItem>
                                            <SelectItem
                                                key="AUDIO"
                                                value='AUDIO'
                                                className='capitalize'
                                            >
                                                Audio
                                            </SelectItem>
                                            <SelectItem
                                                key="VIDEO"
                                                value='VIDEO'
                                                className='capitalize'
                                            >
                                                
                                                Video
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </div>
                        <DialogFooter className='bg-gray-100 px-6 py-4'>
                            <Button type="submit" disabled={isLoading} variant="primary">
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}
