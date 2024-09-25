"use client"

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Components } from 'react-markdown'

export interface QuestionListItem {
  question: string;
  answer: string;
}

export function QuestionsList({
  items
}: {
  items: QuestionListItem[];
}) {
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
    <section className="w-full pt-7 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                className="flex justify-between items-center w-full text-left focus:outline-none"
                onClick={() => toggleQuestion(index)}
                aria-expanded={openQuestion === index}
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-white/90">{item.question}</span>
                {openQuestion === index ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              {openQuestion === index && (
                <ReactMarkdown
                  className="mt-2 text-muted-foreground space-y-2"
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