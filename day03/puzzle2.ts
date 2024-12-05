export default function solution(input: string): any {
  const regex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/gm
  let result: RegExpExecArray | null
  let sum = 0
  let enabled = true
  while ((result = regex.exec(input)) !== null) {
    const [match] = result
    if (match === 'do()') {
      enabled = true
      continue
    } else if (match === 'don\'t()') {
      enabled = false
      continue
    }
    if (!enabled) continue
    const params = match.slice(4, match.length - 1).split(',').map(Number)
    sum += params[0] * params[1]
  }
  return sum
}