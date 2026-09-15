import type { Metadata } from "next";
import ContactHero from "@/components/contactus/ContactHero";
import TalkToOurTeam from "@/components/contactus/TalkToOurTeam";
import EnquiryBanner from "@/components/EnquiryBanner";
import Footer from "@/components/Footer";
import { getContactData } from "@/services/contactService";
import { getCommonData } from "@/services/commonService";

export async function generateMetadata(): Promise<Metadata> {
  const contactData = await getContactData();
  return {
    title: `${contactData.hero.heading} | Urban Living PG`,
    description: contactData.hero.subtitle || "Get in touch with Urban Living PG to book a visit or inquire about available rooms.",
  };
}

export default async function ContactPage() {
  const contactData = await getContactData();
  const commonData = await getCommonData();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC] font-sans text-slate-900">
      {/* 1. Uncropped Full Hero Image with Transparent Navbar & Contact Us Heading */}
      <ContactHero data={contactData.hero} navbarData={commonData.navbar} />

      {/* 2. Form Section starting cleanly near the bottom edge of hero */}
      <main className="flex-1 -mt-10 sm:-mt-16 md:-mt-20 relative z-30 mb-12">
        <TalkToOurTeam data={contactData.talkToOurTeam} />
      </main>

      {/* 3. Enquiry Banner Section */}
      <EnquiryBanner data={commonData.enquiryBanner} />

      {/* 4. Footer Section */}
      <Footer data={commonData.footer} />
    </div>
  );
}
