import { Metadata } from 'next'
import { OPENGRAPH_SITE_NAME } from '@/configuration'
import { QuestionListItem, QuestionsList } from '@/components/questions-list'

export const metadata: Metadata = {
    title: "Fequently Asked Questions",
    description: "Answers to Frequently Asked Questions about Toilet Tower Defense here!",
    openGraph: {
        siteName: OPENGRAPH_SITE_NAME
    }
};

const faqData: QuestionListItem[] = [
    {
        question: "I purchased something for Robux but I didn't get anything. What do I do?",
        answer: "Join a new server, and you should be granted your purchase. If it's not, contact Roblox Support: [roblox.com/support](https://roblox.com/support)",
    },
    {
        question: "What do I do if I got hacked?",
        answer: `
  If someone random gained access to your Roblox Account, don't worry.
  
  Here's a guide on how to stop the hackers from further accessing your account:
  
  1. Go to Roblox Settings - [roblox.com/my/account](https://www.roblox.com/my/account)
  2. Change your password.
  3. Go to the "Security" tab.
  4. Scroll down and click "Logout of All Other Sessions".
  5. Your account is now safe again!
  
  **You need to do this _as soon as possible_, as the hacker can change your password and lock you out of your own account.**
          `,
    },
]

export default function FAQPage() {
    return (
        <div className="flex flex-col min-h-screen text-white">
            <main className="flex-1">
                <div className="pt-10">
                    <h1 className="text-3xl font-bold tracking-tighter text-black lg:text-6xl/none text-center dark:text-white">
                        Frequently Asked Questions
                    </h1>
                    <br />
                    <p className="mx-auto max-w-[700px] text-black md:text-xl text-center dark:text-white">
                        You can find answers to a lot of the frequently asked questions here.
                    </p>
                </div>
                <QuestionsList items={faqData}/>
            </main>
        </div>
    )
}