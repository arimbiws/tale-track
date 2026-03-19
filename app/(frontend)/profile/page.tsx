import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileClient from "@/components/ProfileClient";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login?callbackUrl=/profile");
  }

  const dbUser = await prisma.profile.findUnique({
    where: { email: session.user.email },
  });

  return <ProfileClient user={dbUser || session.user} />;
}
