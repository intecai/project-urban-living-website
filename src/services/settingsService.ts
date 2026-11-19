import { fetchApi } from "@/utils/apiClient";

export interface SettingsDTO {
  id: string;
  businessEmail: string;
  contactNumber: string;
  whatsappNumber: string;
  pgAddress: string | null;
  googleMapsUrl: string;
  businessHours: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  createdAt: string;
  updatedAt: string;
}

export async function getSettingsData(): Promise<SettingsDTO | null> {
  try {
    const res = await fetchApi<any>('/settings');
    if (res) {
      if (res.data) return res.data;
      if (res.value) return res.value;
      if (typeof res === 'object' && 'businessEmail' in res) return res;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch settings", error);
    return null;
  }
}
