import { IconProps } from "@radix-ui/react-icons/dist/types";

export function ToiletIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24" height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7,12h13s1,0,1,1c0,4-4,5-7,5,0,0,2,2,2,3s-1,1-1,1H6s-1,0-1-1,2-3,2-3c0,0-4-1-4-5V4c0-1,1-2,2-2H13c1,0,2,1,2,2V12" />
    </svg>
  )
}