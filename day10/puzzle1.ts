export type Coords = { row: number, column: number }

export function canMoveUp(map: number[][], row: number, column: number) {
  return ((row > 0) && (map[row][column] === map[row - 1][column] - 1))
}

export function canMoveDown(map: number[][], row: number, column: number) {
  return ((row < map.length - 1) && (map[row][column] === map[row + 1][column] - 1))
}

export function canMoveRight(map: number[][], row: number, column: number) {
  return ((column < map[row].length - 1) && (map[row][column] === map[row][column + 1] - 1))
}

export function canMoveLeft(map: number[][], row: number, column: number) {
  return ((column > 0) && (map[row][column] === map[row][column - 1] - 1))
}

function getScore(map: number[][], row: number, column: number, visited: Coords[]) {
  const position = map[row][column]
  if (position === 9) {
    if (visited.find((coord) => coord.row === row && coord.column === column)) return { score: 0, visited }
    return { score: 1, visited: [...visited, { row, column }] }
  }
  let score = 0
  if (canMoveUp(map, row, column)) {
    const result = getScore(map, row - 1, column, visited)
    score += result?.score
    visited = result?.visited
  }
  if (canMoveDown(map, row, column)) {
    const result = getScore(map, row + 1, column, visited)
    score += result?.score
    visited = result?.visited
  }
  if (canMoveRight(map, row, column)) {
    const result = getScore(map, row, column + 1, visited)
    score += result?.score
    visited = result?.visited
  }
  if (canMoveLeft(map, row, column)) {
    const result = getScore(map, row, column - 1, visited)
    score += result?.score
    visited = result?.visited
  }
  return { score, visited }
}

export default function solution(input: string): any {
  const map = input.split('\n').map((line) => line.split('').map(Number))
  let sum = 0
  for (let row = 0; row < map.length; row++) {
    const positions = map[row]
    for (let column = 0; column < positions.length; column++) {
      const position = positions[column]
      if (position !== 0) continue
      const result = getScore(map, row, column, [])
      sum += result.score
    }
  }
  return sum
}