"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Progress } from "@mantine/core";
import Dropzone, { FileRejection } from "react-dropzone";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { cn } from "../../../../lib/utils";
import MaxWidthWrapper from "../../../../components/MaxWidthWrapper";

export default function page() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(45);
  const [isPending, startTransition] = useTransition();

  const isUploading = false;

  function handleDropAccepted() {}

  function handleDropRejected() {}
  return (
    <section>
      <MaxWidthWrapper>
        <div className="flex flex-col min-h-[calc(100vh-3.5rem-1px)] ">
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
                      <MousePointerSquareDashed className="w-6 h-6 mb-2" />
                    ) : isUploading || isPending ? (
                      <Loader2 className="animate-spin w-6 h-6 mb-2" />
                    ) : (
                      <Image className="w-6 h-6 mb-2" />
                    )}
                    {isUploading ? (
                      <div>
                        <span>Uploading ...</span>
                        <Progress
                          value={uploadProgress}
                          className="w-40 h-2 bg-gray-300"
                          color="#00a34a"
                          transitionDuration={200}
                        />
                      </div>
                    ) : isPending ? (
                      <span>Redirecting ...</span>
                    ) : isDragOver ? (
                      <span>Drag file to upload</span>
                    ) : (
                      <span>Click to upload or drag and drop</span>
                    )}
                    {isPending ? null : (
                      <span className="text-sm">
                        Accepted file types: .PNG, .JPG, .JPEG
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
