import homeData from "@/data/home.json";
import { HomeData } from "@/types/home";

export async function getHomeData(): Promise<HomeData> {
  return homeData as HomeData;
}
