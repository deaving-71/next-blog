import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen h-full bg-woodsmoke-950 text-zinc-200">
      <Header />
      <main className="max-w-[1280px] px-8 mt-10 mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
