"use client"

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Components } from 'react-markdown'

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "I purchased something for Robux but I didn't get anything. What do I do?",
    answer: "Join a new server, and you should be granted your purchase. If it's not, contact Roblox Support: [roblox.com/support](https://roblox.com/support)",
  },
  {
    question: "What do I do if I got hacked?",
    answer: `
If someone random gain access to your Roblox Account, don't worry.

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

export function QuestionsList() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index)
  }

  // Define custom renderers with correct types
  const renderers: Partial<Components> = {
    a: ({ node, href, children, ...props }) => (
      <a
        href={href}
        className="underline text-blue-600 hover:text-blue-800"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    strong: ({ node, children, ...props }) => (
      <strong className="font-bold" {...props}>
        {children}
      </strong>
    ),
    em: ({ node, children, ...props }) => (
      <em className="italic" {...props}>
        {children}
      </em>
    ),
    u: ({ node, children, ...props }) => (
      <u className="underline" {...props}>
        {children}
      </u>
    ),
  }

  return (
    <section className="w-full pt-7 pb-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                className="flex justify-between items-center w-full text-left focus:outline-none"
                onClick={() => toggleQuestion(index)}
                aria-expanded={openQuestion === index}
              >
                <span className="text-lg font-semibold text-gray-900">{item.question}</span>
                {openQuestion === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openQuestion === index && (
                <ReactMarkdown
                  className="mt-2 text-gray-600 space-y-2"
                  components={renderers}
                >
                  {item.answer}
                </ReactMarkdown>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}