type Block = { id: number, size: number, empty: boolean }

function getNextEmptyBlockIndex(expandedMap: Block[], start: number) {
  for (let index = start; index < expandedMap.length; index++) {
    if (expandedMap[index].empty) return index
  }
  return -1
}

function parseMap(diskMap: number[]) {
  let expandedMap: Block[] = []
  let isFile = true
  let currentId = 0
  for (const digit of diskMap) {
    expandedMap.push({ id: currentId, size: digit, empty: !isFile })
    if (isFile) currentId++
    isFile = !isFile
  }
  return expandedMap
}

function compact(expandedMap: Block[]) {
  let compactedMap = [...expandedMap]
  for (let index = compactedMap.length - 1; index >= 0; index--) {
    const element = compactedMap[index]
    if (element.empty) continue
    let nextEmptyBlockIndex = -1
    while (true) {
      nextEmptyBlockIndex = getNextEmptyBlockIndex(compactedMap, nextEmptyBlockIndex + 1)
      if ((nextEmptyBlockIndex > index) || (nextEmptyBlockIndex === -1)) break
      const emptySize = compactedMap[nextEmptyBlockIndex].size
      if (emptySize < element.size) continue
      compactedMap[nextEmptyBlockIndex] = compactedMap[index]
      compactedMap[index] = { id: -1, size: element.size, empty: true }
      if (emptySize > element.size) {
        compactedMap.splice(nextEmptyBlockIndex + 1, 0, { id: -1, size: emptySize - element.size, empty: true })
      }
      break
    }
  }
  return compactedMap
}

function checksum(compactedMap: Block[]) {
  let sum = 0
  let position = 0
  for (let index = 0; index < compactedMap.length; index++) {
    const element = compactedMap[index]
    if (element.empty) {
      position += element.size
      continue
    }
    for (let size = 0; size < element.size; size++) {
      sum += element.id * (position + size)
    }
    position += element.size
  }
  return sum
}

function printMap(map: Block[]) {
  let printout = ''
  for (const block of map) {
    for (let index = 0; index < block.size; index++) {
      if (block.empty) printout += '.'
      else printout += block.id
    }
  }
  console.log(printout)
}

export default function solution(input: string): any {
  const diskMap = input.split('').map(Number)
  return checksum(compact(parseMap(diskMap)))
}