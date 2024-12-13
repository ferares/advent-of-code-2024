export type Coords = { x: number, y: number }

export function validAntinode(antinode: Coords, gridWidth: number, gridHeight: number) {
  return (antinode.x >= 0) && (antinode.x < gridWidth) && (antinode.y >= 0) && (antinode.y < gridHeight)
}

function placeSymbol(row: string, index: number, symbol: string) {
  return row.substring(0, index) + symbol + row.substring(index + symbol.length);
}

export function drawGrid(lines: string [], antinodes: Coords[]) {
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]
    for (let x = 0; x < line.length; x++) {
      if (antinodes.findIndex((value) => value.x === x && value.y === y ) > -1) {
        lines[y] = placeSymbol(lines[y], x, '#')
      }
    }
    console.log(lines[y])
  }
}

function isAntenna(cell: string) {
  return cell !== '.'
}

export function getAntennas(lines: string[]) {
  const antennas: Map<string, Coords[]> = new Map()
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex]
    for (let colIndex = 0; colIndex < line.length; colIndex++) {
      const cell = line[colIndex]
      if (isAntenna(cell)) {
        if (!antennas.has(cell)) antennas.set(cell, [])
        antennas.get(cell)?.push({ x: colIndex, y: lineIndex })
      }
    }
  }
  return antennas
}

export function calculateAntinodes(antenna1: Coords, antenna2: Coords) {
  const distance: Coords = { x: Math.abs(antenna1.x - antenna2.x), y: Math.abs(antenna1.y - antenna2.y) }
  const antinode1: Coords = { x: 0, y: 0 }
  const antinode2: Coords = { x: 0, y: 0 }
  if (antenna1.x > antenna2.x) {
    antinode1.x = antenna1.x + distance.x
    antinode2.x = antenna2.x - distance.x
  } else {
    antinode1.x = antenna1.x - distance.x
    antinode2.x = antenna2.x + distance.x
  }
  if (antenna1.y > antenna2.y) {
    antinode1.y = antenna1.y + distance.y
    antinode2.y = antenna2.y - distance.y
  } else {
    antinode1.y = antenna1.y - distance.y
    antinode2.y = antenna2.y + distance.y
  }
  return [antinode1, antinode2]
}

function getAntinodes(antennas: Map<string, Coords[]>, gridWidth: number, gridHeight: number) {
  const antinodes: Coords[] = []
  for (const symbol of antennas.keys()) {
    const coords = antennas.get(symbol) as Coords[]
    for (let index = 0; index < coords.length; index++) {
      const a1 = coords[index]
      for (const a2 of coords) {
        if ((a1.x === a2.x) && (a1.y === a2.y)) continue
        const [antinode1, antinode2] = calculateAntinodes(a1, a2)
        if ((validAntinode(antinode1, gridWidth, gridHeight)) && (!antinodes.find((value) => value.x === antinode1.x && value.y === antinode1.y))) antinodes.push(antinode1)
        if ((validAntinode(antinode2, gridWidth, gridHeight)) && (!antinodes.find((value) => value.x === antinode2.x && value.y === antinode2.y))) antinodes.push(antinode2)
      }
    }
  }
  return antinodes
}

export default function solution(input: string): any {
  const lines = input.split('\n')
  const antennas = getAntennas(lines)
  const antinodes = getAntinodes(antennas, lines[0].length, lines.length)
  drawGrid(lines, antinodes)
  return antinodes.length
}