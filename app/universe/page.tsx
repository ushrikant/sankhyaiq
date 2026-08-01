import Navbar from "@/components/Navbar";
import AgeBandTabs from "@/components/universe/AgeBandTabs";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "History of the Universe | SankhyaIQ",
  description:
    "The story of the universe, from the Big Bang to today, told for every age.",
};

export default function UniversePage() {
  return (
    <>
      <Navbar />
      <AgeBandTabs />
      <Footer />
    </>
  );
}
