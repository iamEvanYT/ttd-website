import { redirect } from "next/navigation"

const REDIRECT_URL = "https://discord.com/invite/SrnQt2yDeZ"
export default async function Redirection() {
    return redirect(REDIRECT_URL)
}