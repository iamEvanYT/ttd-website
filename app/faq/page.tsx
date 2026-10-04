import { Metadata } from 'next'
import { OPENGRAPH_SITE_NAME } from '@/configuration'
import { PageHeader } from '@/components/custom/page-header'
import { QuestionListItem, QuestionsList } from '@/components/utility/questions-list'

export const metadata: Metadata = {
    title: "Frequently Asked Questions",
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
        <main className="flex-1">
            <PageHeader
                eyebrow="Help"
                title="Frequently Asked Questions"
                description="You can find answers to a lot of the frequently asked questions here."
            />
            <div className="container mx-auto max-w-3xl px-4 md:px-6 pb-20">
                <QuestionsList items={faqData} />
            </div>
        </main>
    )
}
