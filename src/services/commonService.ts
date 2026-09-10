import commonData from "@/data/common.json";
import { CommonData } from "@/types/common";

export async function getCommonData(): Promise<CommonData> {
  return commonData as CommonData;
}
