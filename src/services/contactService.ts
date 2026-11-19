import { cache } from "react";
import contactData from "@/data/contact.json";
import { ContactPageData } from "@/types/contact";

export const getContactData = cache(async function getContactData(): Promise<ContactPageData> {
  return contactData as ContactPageData;
});
