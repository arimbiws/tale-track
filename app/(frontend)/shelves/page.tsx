import { prisma } from "@/lib/prisma";
import ShelvesClient from "@/components/ShelvesClient";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ShelvesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const shelves = await prisma.shelf.findMany({
    where: { user_id: session.user.id },
    include: {
      items: {
        include: { book: true },
      },
    },
    orderBy: { created_at: "asc" },
  });

  return <ShelvesClient initialShelves={shelves} />;
}
