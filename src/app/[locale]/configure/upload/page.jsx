"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Progress } from "@mantine/core";
import Dropzone, { FileRejection } from "react-dropzone";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { cn } from "../../../../lib/utils";
import { useUploadThing } from "../../../../lib/uploadthing";
import MaxWidthWrapper from "../../../../components/MaxWidthWrapper";
import { useRouter } from "next/navigation";
import Steps from "../../../../components/Steps";

export default function page() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPending, startTransition] = useTransition();
  // const isPending = true;
  const router = useRouter();

  // const isUploading = true;

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: ([data]) => {
        // alert("uploaded successfully!");
        const configId = data.serverData.configId;

        startTransition(() => {
          router.push(`/configure/design?id=${configId}`);
        });
      },
      onUploadError: () => {
        alert("error occurred while uploading");
      },
      onUploadBegin: () => {
        // alert("upload has begun");
      },
      onUploadProgress: (p) => {
        setUploadProgress(p);
      },
    }
  );

  // const isUploading = false;

  function handleDropAccepted(acceptedFiles) {
    startUpload(acceptedFiles, { configId: undefined });
    setIsDragOver(false);
  }

  function handleDropRejected(rejectedFiles) {
    // startUpload(acceptedFiles, { configId: undefined });

    const [file] = rejectedFiles;

    setIsDragOver(false);
  }
  return (
    <section>
      <MaxWidthWrapper>
        <div className="flex flex-col min-h-[calc(100vh-3.5rem-1px)] ">
          <Steps currentStep={0} />

          <div
            className={cn(
              "relative my-16 w-full h-full flex flex-col flex-1 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10",
              {
                "ring-blue-900/25 bg-blue-900/10": isDragOver,
              }
            )}
          >
            <div className="w-full h-full flex-1 flex flex-col items-center justify-center">
              <Dropzone
                onDropRejected={handleDropRejected}
                onDropAccepted={handleDropAccepted}
                accept={{
                  "image/png": [".png"],
                  "image/jpeg": [".jpeg"],
                  "image/jpg": [".jpg"],
                }}
                onDragEnter={() => setIsDragOver(true)}
                onDragLeave={() => setIsDragOver(false)}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="w-full h-full flex flex-1 flex-col items-center justify-center"
                  >
                    <input {...getInputProps()} />
                    {isDragOver ? (
                      <MousePointerSquareDashed className="w-6 h-6 mb-2 text-zinc-500" />
                    ) : isUploading || isPending ? (
                      <Loader2 className="animate-spin w-6 h-6 mb-2 text-zinc-500" />
                    ) : (
                      <Image className="w-6 h-6 mb-2 text-zinc-500" />
                    )}
                    {isUploading ? (
                      <div>
                        <span className="font-recursive text-zinc-500 font-medium block text-center mb-2">
                          Uploading ...
                        </span>
                        <Progress
                          value={uploadProgress}
                          className="w-40 h-2 bg-gray-300 mb-2"
                          color="#00a34a"
                          transitionDuration={200}
                        />
                      </div>
                    ) : isPending ? (
                      <span className="font-recursive text-zinc-500 font-medium block text-center mb-2">
                        Redirecting ...
                      </span>
                    ) : isDragOver ? (
                      <span className="font-recursive text-sm block text-center ">
                        Drag file to upload
                      </span>
                    ) : (
                      <span className="text-sm text-zinc-700  font-recursive">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </span>
                    )}
                    {isPending ? null : (
                      <span className="text-sm mt-1 text-zinc-500">
                        (.PNG, .JPG, .JPEG)
                      </span>
                    )}
                    {/* okokok */}
                  </div>
                )}
              </Dropzone>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
