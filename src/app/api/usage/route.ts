import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.users.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        plan: true,
        usageCount: true,
        usageLimit: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      usageCount: user.usageCount,
      usageLimit: user.usageLimit,
      plan: user.plan,
      canUpload: user.usageCount < user.usageLimit,
    });

  } catch (e) {
    console.error("Usage check error:", e);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.users.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        plan: true,
        usageCount: true,
        usageLimit: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.usageCount >= user.usageLimit) {
      return NextResponse.json(
        {
          error: "Usage limit reached",
          usageCount: user.usageCount,
          usageLimit: user.usageLimit,
          plan: user.plan,
          canUpload: false,
        },
        { status: 403 }
      );
    }

    const updatedUser = await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        usageCount: user.usageCount + 1,
      },
      select: {
        usageCount: true,
        usageLimit: true,
        plan: true,
      },
    });

    return NextResponse.json({
      usageCount: updatedUser.usageCount,
      usageLimit: updatedUser.usageLimit,
      plan: updatedUser.plan,
      canUpload:
        updatedUser.usageCount < updatedUser.usageLimit,
    });

  } catch (e) {
    console.error("Usage update error:", e);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}