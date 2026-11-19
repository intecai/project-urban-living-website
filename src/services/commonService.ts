import commonData from "@/data/common.json";
import { CommonData } from "@/types/common";
import { getSettingsData } from "./settingsService";

export async function getCommonData(): Promise<CommonData> {
  const baseData = JSON.parse(JSON.stringify(commonData)) as CommonData;
  const settings = await getSettingsData();
  
  if (settings) {
    // Update Navbar phone
    if (settings.contactNumber) {
      baseData.navbar.phoneNumber = settings.contactNumber;
      baseData.navbar.phoneRaw = settings.contactNumber.replace(/[^0-9]/g, '');
    }
    
    // Update Footer
    if (settings.contactNumber) {
      baseData.footer.contactInfo.phone = settings.contactNumber;
    }
    if (settings.businessEmail) {
      baseData.footer.contactInfo.email = settings.businessEmail;
    }
    if (settings.pgAddress) {
      baseData.footer.contactInfo.address = settings.pgAddress;
    }
    
    // Add socialLinks to footer (need to update Footer.tsx to read this too)
    baseData.footer.socialLinks = {
      instagram: settings.instagramUrl || "https://instagram.com",
      facebook: settings.facebookUrl || "https://facebook.com",
      youtube: settings.youtubeUrl || "https://youtube.com",
    };
    
    // Set whatsapp globally so layout can use it, but commonData isn't used in layout directly yet.
    // For now we add it to footer or a top level settings object if we update types.
  }
  
  return baseData;
}
