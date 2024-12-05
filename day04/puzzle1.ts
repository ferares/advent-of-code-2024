const TARGET = 'XMAS'

function searchHorizontal(charIndex: number, line: string) {
  let hits = 0
  let horizontalRight = ''
  let horizontalLeft = ''
  for (let index = 0; index < TARGET.length; index++) {
    horizontalRight += line[charIndex + index]
    horizontalLeft += line[charIndex - index]
  }
  if (horizontalRight === TARGET) hits++
  if (horizontalLeft === TARGET) hits++
  return hits
}

function searchVertical(lineIndex: number, charIndex: number, lines: string[]) {
  let hits = 0
  let verticalUp = ''
  let verticalDown = ''
  for (let index = 0; index < TARGET.length; index++) {
    verticalUp += lines[lineIndex - index]?.[charIndex]
    verticalDown += lines[lineIndex + index]?.[charIndex]
  }
  if (verticalUp === TARGET) hits++
  if (verticalDown === TARGET) hits++
  return hits
}

function searchDiagonal(lineIndex: number, charIndex: number, lines: string[]) {
  let hits = 0
  let diagonalUpRight = ''
  let diagonalUpLeft = ''
  let diagonalDownRight = ''
  let diagonalDownLeft = ''
  for (let index = 0; index < TARGET.length; index++) {
    diagonalUpRight += lines[lineIndex - index]?.[charIndex + index]
    diagonalUpLeft += lines[lineIndex - index]?.[charIndex - index]
    diagonalDownRight += lines[lineIndex + index]?.[charIndex + index]
    diagonalDownLeft += lines[lineIndex + index]?.[charIndex - index]
  }
  if (diagonalUpRight === TARGET) hits++
  if (diagonalUpLeft === TARGET) hits++
  if (diagonalDownRight === TARGET) hits++
  if (diagonalDownLeft === TARGET) hits++
  return hits
}

export default function solution(input: string): any {
  const lines = input.split('\n')
  let hits = 0
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex]
    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      if (line[charIndex] !== 'X') continue
      hits += searchHorizontal(charIndex, line)
      hits += searchVertical(lineIndex, charIndex, lines)
      hits += searchDiagonal(lineIndex, charIndex, lines)
    }
  }
  return hits
}