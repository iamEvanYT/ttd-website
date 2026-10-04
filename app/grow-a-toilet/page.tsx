import { redirect } from "next/navigation";

const REDIRECT_URL =
  "https://www.roblox.com/games/start?placeId=13775256536&launchData=GrowAToilet";
export default async function Redirect() {
  return redirect(REDIRECT_URL);
}
