function downRight(lineIndex: number, charIndex: number, lines: string[]) {
  return lines[lineIndex + 1]?.[charIndex + 1]
}

function downLeft(lineIndex: number, charIndex: number, lines: string[]) {
  return lines[lineIndex + 1]?.[charIndex - 1]
}

function upRight(lineIndex: number, charIndex: number, lines: string[]) {
  return lines[lineIndex - 1]?.[charIndex + 1]
}

function upLeft(lineIndex: number, charIndex: number, lines: string[]) {
  return lines[lineIndex - 1]?.[charIndex - 1]
}

export default function solution(input: string): any {
  const lines = input.split('\n')
  let hits = 0
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex]
    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      if (line[charIndex] !== 'A') continue
      // Down - Right
      if (downRight(lineIndex, charIndex, lines) === 'M') {
        if (upLeft(lineIndex, charIndex, lines) !== 'S') continue
        if (downLeft(lineIndex, charIndex, lines) === 'M') {
          if (upRight(lineIndex, charIndex, lines) !== 'S') continue
          hits++
        } else if (downLeft(lineIndex, charIndex, lines) === 'S') {
          if (upRight(lineIndex, charIndex, lines) !== 'M') continue
          hits++
        }
      // Down - Left
      } else if (downLeft(lineIndex, charIndex, lines) === 'M') {
        if (upRight(lineIndex, charIndex, lines) !== 'S') continue
        if (upLeft(lineIndex, charIndex, lines) === 'M') {
          if (downRight(lineIndex, charIndex, lines) !== 'S') continue
          hits++
        } else if (upLeft(lineIndex, charIndex, lines) === 'S') {
          if (downRight(lineIndex, charIndex, lines) !== 'M') continue
          hits++
        }
      // Up - Right
      } else if (upRight(lineIndex, charIndex, lines) === 'M') {
        if (downLeft(lineIndex, charIndex, lines) !== 'S') continue
        if (upLeft(lineIndex, charIndex, lines) === 'M') {
          if (downRight(lineIndex, charIndex, lines) !== 'S') continue
          hits++
        } else if (upLeft(lineIndex, charIndex, lines) === 'S') {
          if (downRight(lineIndex, charIndex, lines) !== 'M') continue
          hits++
        }
      }
    }
  }
  return hits
}