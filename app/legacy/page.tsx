import Redirection from "@/components/utility/redirection";

const REDIRECT_URL =
  "https://www.roblox.com/games/start?placeId=13775256536&launchData=Legacy";
export default async function Redirect() {
  return <Redirection url={REDIRECT_URL} />;
}
