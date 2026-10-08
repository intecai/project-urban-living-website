import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCommonData } from "@/services/commonService";
import { Home, SearchX, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Room Not Found | Urban Living PG",
  description: "The requested room accommodation could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NotFound() {
  const commonData = await getCommonData();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAFCFF] font-figtree text-slate-900">
      <Navbar variant="solid" activeLink="Our Rooms" data={commonData.navbar} />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-16 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600">
            <SearchX className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#011A2A] tracking-tight font-figtree">
              Room Not Found
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-figtree">
              Sorry, the requested room accommodation could not be found or is no longer available.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/rooms"
              className="w-full sm:w-auto bg-[#2571A5] hover:bg-[#02569B] text-white py-3.5 px-6 rounded-xl font-medium text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Explore All Rooms</span>
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 px-6 rounded-xl font-medium text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer data={commonData.footer} />
    </div>
  );
}
