import { findGuard, getVisited, moveDown, moveLeft, moveRight, moveUp } from './puzzle1'

function placeObstacle(row: string, index: number) {
  return row.substring(0, index) + '#' + row.substring(index + 1);
}

function detectLoop(grid: string[]) {
  const visited: string[] = []
  let [guardRow, guardColumn] = findGuard(grid) as number[]
  while (true) {
    const guardCell = grid[guardRow][guardColumn]
    // If the cell was not visited before mark it as so
    if (visited.includes(`${guardRow},${guardColumn},${guardCell}`)) return true
    visited.push(`${guardRow},${guardColumn},${guardCell}`)
    if (guardCell === '^') {
      const result = moveUp(grid, guardRow, guardColumn)
      if (!result) break
      [guardRow, guardColumn] = result
    } else if (guardCell === '>') {
      const result = moveRight(grid, guardRow, guardColumn)
      if (!result) break
      [guardRow, guardColumn] = result
    } else if (guardCell === '<') {
      const result = moveLeft(grid, guardRow, guardColumn)
      if (!result) break
      [guardRow, guardColumn] = result
    } else if (guardCell === 'v') {
      const result = moveDown(grid, guardRow, guardColumn)
      if (!result) break
      [guardRow, guardColumn] = result
    }
  }
  return false
}

export default function solution(input: string): any {
  const grid = input.split('\n')
  const visited = getVisited([...grid])
  visited.splice(0, 1) // Remove starting position
  let solutions = 0
  for (const cell of visited) {
    const [row, column] = cell.split(',').map(Number)
    const newGrid = [...grid]
    newGrid[row] = placeObstacle(grid[row], column)
    if (detectLoop([...newGrid])) solutions++
  }
  return solutions
}