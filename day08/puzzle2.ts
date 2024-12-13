import { calculateAntinodes, Coords, drawGrid, getAntennas } from './puzzle1'

function validAntinode(antinode: Coords, gridWidth: number, gridHeight: number) {
  return (antinode.x >= 0) && (antinode.x < gridWidth) && (antinode.y >= 0) && (antinode.y < gridHeight)
}

function getAntinodes(antennas: Map<string, Coords[]>, gridWidth: number, gridHeight: number) {
  const antinodes: Coords[] = []
  for (const symbol of antennas.keys()) {
    const coords = antennas.get(symbol) as Coords[]
    for (let index = 0; index < coords.length; index++) {
      const antenna1 = coords[index]
      for (const antenna2 of coords) {
        const distance: Coords = { x: Math.abs(antenna1.x - antenna2.x), y: Math.abs(antenna1.y - antenna2.y) }
        if ((distance.x === 0) && (distance.y === 0)) continue
        let [antinode1, antinode2] = calculateAntinodes(antenna1, antenna2)
        let antenna = antenna1
        while (validAntinode(antinode1, gridWidth, gridHeight)) {
          if (!antinodes.find((value) => value.x === antinode1.x && value.y === antinode1.y)) antinodes.push(antinode1)
          const aux = calculateAntinodes(antenna, antinode1)[1]
          antenna = antinode1
          antinode1 = aux
        }
        antenna = antenna2
        while (validAntinode(antinode2, gridWidth, gridHeight)) {
          if (!antinodes.find((value) => value.x === antinode2.x && value.y === antinode2.y)) antinodes.push(antinode2)
          const aux = calculateAntinodes(antenna, antinode2)[1]
          antenna = antinode2
          antinode2 = aux
        }
      }
    }
  }
  for (const symbol of antennas.keys()) {
    const coords = antennas.get(symbol) as Coords[]
    for (const antenna of coords) {
      if (!antinodes.find((value) => value.x === antenna.x && value.y === antenna.y)) antinodes.push(antenna)
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