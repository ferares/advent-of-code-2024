import { mkdirSync, readFileSync, writeFileSync } from 'fs'

import { readInput } from './input'

const args = process.argv.slice(2)

async function runSolution(day: string, puzzle: string) {
  const solution = await import(`./day${day}/puzzle${puzzle}`)
  const input = readInput(day)
  console.log(solution.default(input))
}

if (args.length === 1) {
  const day = args[0]
  const dir = `./day${day}`
  mkdirSync(dir)
  const template = readFileSync('./template.ts')
  writeFileSync(`${dir}/puzzle1.ts`, template)
  writeFileSync(`${dir}/puzzle2.ts`, template)
} else if (args.length === 2) {
  const day = args[0]
  const puzzle = args[1]
  runSolution(day, puzzle)
}

