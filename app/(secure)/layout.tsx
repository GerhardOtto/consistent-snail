import { Footer } from "../components/footer";
import { Header } from "../components/header";

export default function SecureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col mb-15">
      <Header />
      <div className="grow pt-24 pb-10">{children}</div>
      <Footer />
    </section>
  );
}
