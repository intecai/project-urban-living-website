import { cache } from "react";
import rawCommonData from "@/data/common.json";
import { CommonData } from "@/types/common";
import { getSettingsData } from "./settingsService";

export const getCommonData = cache(async function getCommonData(): Promise<CommonData> {
  const settings = await getSettingsData();
  
  const navbar = { ...rawCommonData.navbar };
  const footer: any = {
    ...rawCommonData.footer,
    contactInfo: { ...rawCommonData.footer.contactInfo },
    socialLinks: (rawCommonData.footer as any).socialLinks ? { ...(rawCommonData.footer as any).socialLinks } : {},
  };

  if (settings) {
    // Update Navbar phone
    if (settings.contactNumber) {
      navbar.phoneNumber = settings.contactNumber;
      navbar.phoneRaw = settings.contactNumber.replace(/[^0-9]/g, '');
    }
    
    // Update Footer
    if (settings.contactNumber) {
      footer.contactInfo.phone = settings.contactNumber;
    }
    if (settings.businessEmail) {
      footer.contactInfo.email = settings.businessEmail;
    }
    if (settings.pgAddress) {
      footer.contactInfo.address = settings.pgAddress;
    }
    
    footer.socialLinks = {
      instagram: settings.instagramUrl || footer.socialLinks?.instagram || "https://instagram.com",
      facebook: settings.facebookUrl || footer.socialLinks?.facebook || "https://facebook.com",
      youtube: settings.youtubeUrl || footer.socialLinks?.youtube || "https://youtube.com",
    };
  }

  return {
    ...rawCommonData,
    navbar,
    footer,
  } as CommonData;
});
