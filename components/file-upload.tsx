"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

const FileUpload: React.FC<FileUploadProps> = ({
  endpoint,
  onChange,
  value,
}) => {
  const fileType = value?.split(".").pop();

  return (
    <>
      {value && fileType !== "pdf"
        ? (
          <div className="relative h-40 w-40">
            <Image
              src={value}
              alt="upload"
              className="rounded-full"
              fill
              sizes="100%"
            />
            <button
              className="bg-destructive text-white rounded-full p-1 absolute top-3 right-3 shadow-sm"
              onClick={() => onChange("")}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )
        : value && fileType === "pdf"
          ? (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-foreground/10">
              <FileIcon className="h-10 w-10 fill-indigo-500 stroke-indigo-400" />
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 hover:underline"
              >
                {value}
              </a>
              <button
                className="bg-destructive text-white rounded-full p-1 absolute -top-2 -right-2 shadow-sm"
                onClick={() => onChange("")}
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )
          : (
            <UploadDropzone
              className="border-muted focus:outline-0"
              endpoint={endpoint}
              onClientUploadComplete={(res) => onChange(res?.[0].url)}
              onUploadError={(error: Error) => console.log(error)}
            />
          )}
    </>
  );
};
export default FileUpload;
