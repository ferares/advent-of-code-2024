function isGuard(cell: string) {
  return (cell !== '.') && !isObstacle(cell)
}

function isObstacle(cell: string) {
  return cell === '#'
}

export function findGuard(grid: string[]) {
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex]
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      if (isGuard(row[columnIndex])) return [rowIndex, columnIndex]
    }
  }
}

function placeGuard(row: string, index: number, guard: string) {
  return row.substring(0, index) + guard + row.substring(index + guard.length);
}

export function moveUp(grid: string[], guardRow: number, guardColumn: number) {
  // If there's no more grid up we're done
  if (guardRow === 0) return false
  const newGuardRow = guardRow - 1
  // If the target cell has an obstacle rotate 90º
  if (isObstacle(grid[newGuardRow][guardColumn])) {
    grid[guardRow] = grid[guardRow].replace('^', '>')
    return [guardRow, guardColumn]
  }
  // If there's no obstacles move the guard
  grid[guardRow] = grid[guardRow].replace('^', '.')
  grid[newGuardRow] = placeGuard(grid[newGuardRow], guardColumn, '^')
  return [newGuardRow, guardColumn]
}

export function moveDown(grid: string[], guardRow: number, guardColumn: number) {
  // If there's no more grid up we're done
  if (guardRow === grid.length - 1) return false
  const newGuardRow = guardRow + 1
  // If the target cell has an obstacle rotate 90º
  if (isObstacle(grid[newGuardRow][guardColumn])) {
    grid[guardRow] = grid[guardRow].replace('v', '<')
    return [guardRow, guardColumn]
  }
  // If there's no obstacles move the guard
  grid[guardRow] = grid[guardRow].replace('v', '.')
  grid[newGuardRow] = placeGuard(grid[newGuardRow], guardColumn, 'v')
  return [newGuardRow, guardColumn]
}

export function moveRight(grid: string[], guardRow: number, guardColumn: number) {
  // If there's no more grid up we're done
  if (guardColumn === grid[guardRow].length - 1) return false
  const newGuardColumn = guardColumn + 1
  // If the target cell has an obstacle rotate 90º
  if (isObstacle(grid[guardRow][newGuardColumn])) {
    grid[guardRow] = grid[guardRow].replace('>', 'v')
    return [guardRow, guardColumn]
  }
  // If there's no obstacles move the guard
  grid[guardRow] = grid[guardRow].replace('>', '.')
  grid[guardRow] = placeGuard(grid[guardRow], newGuardColumn, '>')
  return [guardRow, newGuardColumn]
}

export function moveLeft(grid: string[], guardRow: number, guardColumn: number) {
  // If there's no more grid up we're done
  if (guardColumn === 0) return false
  const newGuardColumn = guardColumn - 1
  // If the target cell has an obstacle rotate 90º
  if (isObstacle(grid[guardRow][newGuardColumn])) {
    grid[guardRow] = grid[guardRow].replace('<', '^')
    return [guardRow, guardColumn]
  }
  // If there's no obstacles move the guard
  grid[guardRow] = grid[guardRow].replace('<', '.')
  grid[guardRow] = placeGuard(grid[guardRow], newGuardColumn, '<')
  return [guardRow, newGuardColumn]
}

export function getVisited(grid: string[]) {
  const visited: string[] = []
  let [guardRow, guardColumn] = findGuard(grid) as number[]
  while (true) {
    const guardCell = grid[guardRow][guardColumn]
    // If the cell was not visited before mark it as so
    if (!visited.includes(`${guardRow},${guardColumn}`)) visited.push(`${guardRow},${guardColumn}`)
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
  return visited
}

export default function solution(input: string): any {
  const grid = input.split('\n')
  const visited = getVisited(grid)
  return visited.length
}