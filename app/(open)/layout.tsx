export default function OpenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <div>{children}</div>
    </section>
  );
}
