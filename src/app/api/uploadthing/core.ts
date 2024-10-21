import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from "sharp";
import { db } from "../../../db";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      // This code runs on your server before upload

      return { input };
      //   const user = await auth(req);

      //   // If you throw, the user will not be able to upload
      //   if (!user) throw new UploadThingError("Unauthorized");

      //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
      //   return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      const { configId } = metadata.input;

      const res = await fetch(file.url);
      const buffer = await res.arrayBuffer();

      const imgMetadata = await sharp(buffer).metadata();
      const { width, height } = imgMetadata;

      if (!configId) {
        const configuration = await db.imageConfiguration.create({
          data: {
            imageUrl: file.url,
            height: height || 500,
            width: width || 500,
          },
        });
        return { configId: configuration.id };
      } else {
        const updatedConfiguration = await db.imageConfiguration.update({
          where: {
            id: configId,
          },
          data: {
            croppedImageUrl: file.url,
          },
        });
        return {
          configId: updatedConfiguration.id,
        };
      }
      // return { configId };
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
