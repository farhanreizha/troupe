import { db } from "@lib/db";

export async function updateProfile({ profileId, displayName, imageUrl }: { profileId: string; displayName: string; imageUrl: string }) {
  return await db.profile.update({
    where: { id: profileId },
    data: { displayName, imageUrl },
  });
}
