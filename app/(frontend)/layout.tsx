import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  let user = session?.user;

  if (user?.email) {
    const dbUser = await prisma.profile.findUnique({
      where: { email: user.email },
      select: { name: true },
    });

    if (dbUser) {
      user = { ...user, name: dbUser.name };
    }
  }

  return (
    <>
      <Navbar user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
