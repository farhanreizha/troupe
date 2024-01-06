import { db } from "@lib/db";
import { MemberRole } from "@prisma/client";

type IProfile = {
  userId: string;
  username: string;
  email: string;
  imageUrl: string;
};

export async function createProfile({ userId, username, email, imageUrl }: IProfile) {
  return await db.profile.create({
    data: {
      userId,
      username,
      email,
      displayName: username,
      imageUrl,
    },
  });
}

type IMessage = {
  content: string;
  fileUrl: string;
  channelId: string;
  memberId: string;
};

export async function createMessage({ content, fileUrl, channelId, memberId }: IMessage) {
  return await db.message.create({
    data: { content, fileUrl, channelId, memberId },
    include: { member: { include: { profile: true } } },
  });
}

type IServer = {
  name: string;
  imageUrl: string;
  profileId: string;
  inviteCode: string;
};

export async function createServer({ name, imageUrl, profileId, inviteCode }: IServer) {
  return await db.server.create({
    data: {
      profileId,
      name,
      imageUrl,
      inviteCode,
      channels: { create: [{ profileId, name: "general" }] },
      members: { create: [{ profileId, role: MemberRole.OWNER }] },
    },
  });
}
