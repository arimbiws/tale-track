import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <>
      <Navbar user={session?.user} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
