import InitialModal from "@/components/modal/initial-modal";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function ProfilePage() {
  const profile = await currentProfile();
  const server = await db.server.findFirst({
    where: { profileId: profile?.id },
  });

  return (
    <div>
      {!server && <InitialModal />}
      <div>Profile Page</div>
    </div>
  );
}
