import { replaceEmptyString } from "@/lib/replaceEmptyString"
import { ReactNode } from "react"

type PropsType = {
  text: string,
  node: ReactNode
}

export default function SingleDetailElement({ text, node }: PropsType) {
  return <span className='flex flex-row gap-2 items-center'>
    {node}
    <span className="small-text-title">
      {replaceEmptyString(text)}
    </span>
  </span>
}