"use client"



import { UploadDropzone } from "@/lib/uploadthing"
import "@uploadthing/react/styles.css";

import { X } from "lucide-react";
import Image from "next/image";



interface FileUploadProps {
    endpoint: "messageFile" | "serverImage"
    value: string
    onChange: (url?: string) => void
}

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {

    const fileType = value?.split(".").pop()

    if (value && fileType !== "pdf") {
        return (
            <div className="h-20 w-20 relative">
                <Image 
                    src={value}
                    fill
                    alt="Upload"
                    className="rounded-full"
                />
                <button>
                    <X 
                        onClick={() => onChange("")}
                        className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                        type="button"
                    />
                </button>
            </div>
        )
    }
    return (
        <div>
            <UploadDropzone 
                endpoint={endpoint}
                onClientUploadComplete={(res) => (
                    onChange(res?.[0].url)
                )}
                onUploadError={(error: Error) => {
                    console.log(error)
                }}
            />
        </div>
    )
}