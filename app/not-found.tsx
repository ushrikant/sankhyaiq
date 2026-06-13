import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="font-playfair text-8xl font-bold text-gray-100 mb-4">404</p>
        <h1 className="font-playfair text-3xl font-bold text-navy mb-4">
          This story does not exist
        </h1>
        <p className="font-plex text-muted mb-8">
          The page you are looking for may have moved or the URL might be wrong.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-cobalt text-white font-plex font-medium px-6 py-3 rounded-full hover:bg-navy transition-colors"
        >
          Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
