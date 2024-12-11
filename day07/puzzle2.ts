import { Equation } from './puzzle1'

function testEquation(equation: Equation) {
  if (equation.factors.length === 1) {
    if (equation.value !== equation.factors[0]) return false
    return equation.value
  }
  const sumFactors = [...equation.factors]
  const mulFactors = [...equation.factors]
  const conFactors = [...equation.factors]
  const firstFactor = sumFactors.shift() as number
  mulFactors.shift()
  conFactors.shift()
  sumFactors[0] = firstFactor + sumFactors[0]
  const sumEquation = { ...equation, factors: sumFactors }
  if (testEquation(sumEquation)) return equation.value
  mulFactors[0] = firstFactor * mulFactors[0]
  const mulEquation = { ...equation, factors: mulFactors }
  if (testEquation(mulEquation)) return equation.value
  conFactors[0] = Number(firstFactor.toString() + conFactors[0].toString())
  const conEquation = { ...equation, factors: conFactors }
  if (testEquation(conEquation)) return equation.value
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