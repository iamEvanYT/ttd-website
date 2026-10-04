"use client"

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
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
        className="font-medium text-primary underline underline-offset-4 hover:opacity-80"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    strong: ({ node, children, ...props }) => (
      <strong className="font-bold text-foreground" {...props}>
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
    <div className="mt-4 space-y-3">
      {items.map((item, index) => {
        const isOpen = openQuestion === index
        return (
          <div
            key={index}
            className={`rounded-2xl border bg-card text-left transition-colors ${isOpen ? "border-primary/40" : "hover:border-foreground/20"}`}
          >
            <button
              className="flex w-full items-center justify-between gap-4 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
              onClick={() => toggleQuestion(index)}
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold md:text-lg">{item.question}</span>
              <span className={`grid size-8 shrink-0 place-items-center rounded-full border transition-all ${isOpen ? "rotate-180 border-primary bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>
            {isOpen && (
              <div className="space-y-2 px-5 pb-5 text-muted-foreground [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 animate-in fade-in slide-in-from-top-1">
                <ReactMarkdown components={renderers}>
                  {item.answer}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
