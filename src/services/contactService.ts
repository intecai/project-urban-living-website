import contactData from "@/data/contact.json";
import { ContactPageData } from "@/types/contact";

export async function getContactData(): Promise<ContactPageData> {
  return contactData as ContactPageData;
}
