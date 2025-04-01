import { Footer } from "../components/footer";
import { Header } from "../components/header";

export default function SecureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <div className="grow">{children}</div>
      <Footer />
    </section>
  );
}
