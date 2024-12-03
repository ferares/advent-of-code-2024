import { parseInput } from "./puzzle1"

export default function solution(input: string): any {
  const [list1, list2] = parseInput(input)
  const occurrences = list1.map((value) => {
    return list2.reduce((acc, current) => {
      if (current === value) return acc + 1
      return acc 
    }, 0) * value
  })
  return occurrences.reduce((acc, current) => acc + current, 0)
}