import { redirect } from "next/navigation"

const redirectURL = "https://www.roblox.com/games/13775256536/"
export default async function Redirection() {
    return redirect(redirectURL)
}