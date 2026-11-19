import { cache } from "react";
import homeData from "@/data/home.json";
import { HomeData } from "@/types/home";

export const getHomeData = cache(async function getHomeData(): Promise<HomeData> {
  return homeData as HomeData;
});
