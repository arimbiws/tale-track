import { PrismaClient } from "@prisma/client";
import ShelvesClient from "@/components/ShelvesClient";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

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
