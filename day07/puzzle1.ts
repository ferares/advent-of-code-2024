export type Equation = { value: number, factors: number[] }

function testEquation(equation: Equation) {
  if (equation.factors.length === 1) {
    if (equation.value !== equation.factors[0]) return false
    return equation.value
  }
  const sumFactors = [...equation.factors]
  const mulFactors = [...equation.factors]
  const firstFactor = sumFactors.shift() as number
  mulFactors.shift()
  sumFactors[0] = firstFactor + sumFactors[0]
  const sumEquation = { ...equation, factors: sumFactors }
  if (testEquation(sumEquation)) return equation.value
  mulFactors[0] = firstFactor * mulFactors[0]
  const mulEquation = { ...equation, factors: mulFactors }
  if (testEquation(mulEquation)) return equation.value
  return false
}

export default function solution(input: string): any {
  const equations = input.split('\n').map((line) => {
    const [valueString, factorsString] = line.split(':')
    const factors = factorsString.trim().split(' ').map(Number)
    return { value: Number(valueString), factors }
  })
  let sum = 0
  for (const equation of equations) {
    const result = testEquation(equation)
    if (!result) continue
    sum += result
  }
  return sum
}