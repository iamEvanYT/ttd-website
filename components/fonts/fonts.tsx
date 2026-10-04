import { Geist } from 'next/font/google'

// Used for body text and, at heavier weights, for headings (`font-display`)
export const SansFont = Geist({
    subsets: ["latin"],
    variable: "--font-sans",
})
