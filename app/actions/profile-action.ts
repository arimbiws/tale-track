"use server";

import { prisma } from "@/lib/prisma";
import { auth, unstable_update } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateProfileName(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) {
    return { error: "You must be logged in to update your profile." };
  }

  const name = formData.get("name") as string;
  if (!name || name.trim() === "") {
    return { error: "Name cannot be empty." };
  }

  try {
    const updatedName = name.trim();

    await prisma.profile.update({
      where: { email: session.user.email },
      data: { name: updatedName },
    });

    await unstable_update({
      user: {
        name: updatedName,
      },
    });

    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    return { error: "Failed to update profile. Please try again." };
  }
}
