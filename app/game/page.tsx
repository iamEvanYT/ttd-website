import Redirection from "@/components/utility/redirection";

const REDIRECT_URL = "https://www.roblox.com/games/13775256536/"
export default async function Redirect() {
    return <Redirection url={REDIRECT_URL}/>;
}