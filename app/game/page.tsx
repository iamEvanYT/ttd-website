import { redirect } from "next/navigation"

const REDIRECT_URL = "https://www.roblox.com/games/13775256536/"
export default async function Redirection() {
    return redirect(REDIRECT_URL)
}