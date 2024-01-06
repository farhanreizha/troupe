import { db } from "@lib/db";

export async function findExist({ username, email }: { username?: string; email?: string }) {
  const existUsername = await db.profile.findUnique({ where: { username } });
  const existEmail = await db.profile.findUnique({ where: { email } });

  return { existUsername, existEmail };
}

export async function findServerWithMember({ serverId, profileId }: { serverId: string; profileId: string }) {
  return await db.server.findFirst({
    where: { id: serverId, members: { some: { profileId } } },
    include: { members: true },
  });
}

export async function findChannel({ channelId, serverId }: { channelId: string; serverId: string }) {
  return await db.channel.findUnique({ where: { id: channelId, serverId } });
}

type IMessage = {
  take?: number;
  skip?: number;
  cursor?: string;
  channelId: string;
};

export async function findAllMessage({ channelId, take, skip, cursor }: IMessage) {
  return await db.message.findMany({
    take,
    skip: skip ? 1 : undefined,
    cursor: cursor ? { id: cursor } : undefined,
    where: { channelId },
    include: {
      member: { include: { profile: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function findServerWithChannel({ serverId, profileId }: { serverId: string; profileId: string }) {
  return await db.server.findUnique({
    where: {
      id: serverId,
      members: { some: { profileId: profileId } },
    },
    include: {
      channels: { where: { name: "general" }, orderBy: { createdAt: "asc" } },
    },
  });
}

export async function findMember({ serverId, profileId }: { serverId: string; profileId: string }) {
  return await db.member.findFirst({ where: { serverId, profileId } });
}

export async function findServer({ profileId }: { profileId: string | undefined }) {
  return await db.server.findFirst({ where: { profileId } });
}
