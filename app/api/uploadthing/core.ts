import { createUploadthing, type FileRouter } from "uploadthing/next";

import { currentProfile } from "@/lib/current-profile";

const f = createUploadthing();

const handleAuth = async () => {
  const user = await currentProfile();

  if (!user?.id) throw new Error("Unauthorized");
  return { userId: user.id };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

  messageFile: f(["image", "pdf", "audio", "video"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
