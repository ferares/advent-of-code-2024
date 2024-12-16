import { canMoveDown, canMoveLeft, canMoveRight, canMoveUp, Coords } from './puzzle1'

function includesPath(array: Coords[][], path: Coords[]) {
  return array.find((element) => {
    if (element.length !== path.length) return false
    for (let index = 0; index < element.length; index++) {
      if (element[index] = path[index]) return false
    }
    return true
  })
}

function getRating(map: number[][], row: number, column: number, paths: Coords[][], path: Coords[]) {
  const position = map[row][column]
  if (position === 9) {
    if (includesPath(paths, path)) paths
    return [...paths, [...path, { row, column }]]
  }
  if (canMoveUp(map, row, column)) {
    paths = getRating(map, row - 1, column, paths, path)
  }
  if (canMoveDown(map, row, column)) {
    paths = getRating(map, row + 1, column, paths, path)
  }
  if (canMoveRight(map, row, column)) {
    paths = getRating(map, row, column + 1, paths, path)
  }
  if (canMoveLeft(map, row, column)) {
    paths = getRating(map, row, column - 1, paths, path)
  }
  return paths
}

export default function solution(input: string): any {
  const map = input.split('\n').map((line) => line.split('').map(Number))
  let sum = 0
  for (let row = 0; row < map.length; row++) {
    const positions = map[row]
    for (let column = 0; column < positions.length; column++) {
      const position = positions[column]
      if (position !== 0) continue
      const result = getRating(map, row, column, [], [])
      sum += result.length
    }
  }
  return sum
}