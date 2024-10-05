import Redirection from "@/components/utility/redirection"

const REDIRECT_URL = "https://discord.com/invite/SrnQt2yDeZ"
export default async function Redirect() {
    return <Redirection url={REDIRECT_URL}/>;
}