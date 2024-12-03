export function parseInput(input: string): number[][] {
  const lines = input.split("\n")
  const list1 = []
  const list2 = []
  for (const line of lines) {
    const [item1, item2] = line.split("   ")
    list1.push(Number(item1))
    list2.push(Number(item2))
  }
  return [list1, list2]
}

function popSmallest(list: number[]): number {
  const smallest = list.reduce((previous, current) => {
    if (previous > current) return current
    return previous
  }, Infinity)
  const index = list.indexOf(smallest)
  list.splice(index, 1)
  return smallest
}

export default function solution(input: string): any {
  const [list1, list2] = parseInput(input)
  let diff = 0
  while (list1.length) {
    const smallest1 = popSmallest(list1)
    const smallest2 = popSmallest(list2)
    diff += Math.abs(smallest1 - smallest2)
  }
  return diff
}