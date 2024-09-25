import { Metadata } from 'next'
import { OPENGRAPH_SITE_NAME } from '@/configuration'
import { QuestionsList } from '@/components/questions-list'

export const metadata: Metadata = {
    title: "Fequently Asked Questions",
    description: "You can find answers to a lot of the frequently asked questions here.",
    openGraph: {
        siteName: OPENGRAPH_SITE_NAME
    }
};

interface FAQItem {
    question: string;
    answer: string;
}

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
                <QuestionsList />
            </main>
        </div>
    )
}