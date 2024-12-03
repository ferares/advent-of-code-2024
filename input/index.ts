import { readFileSync } from 'fs'

export function readInput(day: string): string {
  return readFileSync(`./input/${day}.txt`).toString()
}