import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { v4 as uuid } from "uuid";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const { name, imageUrl } = await request.json();
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuid(),
        channels: {
          create: [{ profileId: profile.id, name: "general" }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.OWNER }],
        },
      },
    });

    // return new NextResponse("Success Create Server", { status: 200 });
    return NextResponse.json(server);
  } catch (error) {
    console.log(`[SERVER_CREATE_POST]: ${error}`);
    return new NextResponse("Internal error", { status: 500 });
  }
}
