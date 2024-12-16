export function getLastFileBlockIndex(expandedMap: string[]) {
  for (let index = expandedMap.length - 1; index >= 0; index--) {
    if (expandedMap[index] !== '.') return index
  }
  return -1
}

export function expandMap(diskMap: number[]) {
  let expandedMap: string[] = []
  let isFile = true
  let currentId = 0
  for (const digit of diskMap) {
    if (isFile) {
      for (let index = 0; index < digit; index++) {
        expandedMap.push(currentId.toString())
      }
      currentId++
      isFile = false
    } else {
      for (let index = 0; index < digit; index++) {
        expandedMap.push('.')
      }
      isFile = true
    }
  }
  return expandedMap
}

function compact(expandedMap: string[]) {
  let compactedMap = [...expandedMap]
  for (let index = 0; index < compactedMap.length; index++) {
    const element = compactedMap[index]
    if (element !== '.') continue
    const lastFileBlockIndex = getLastFileBlockIndex(compactedMap)
    if (lastFileBlockIndex < index) break
    compactedMap[index] = compactedMap[lastFileBlockIndex]
    compactedMap[lastFileBlockIndex] = '.'
  }
  return compactedMap
}

function checksum(compactedMap: string[]) {
  let sum = 0
  for (let index = 0; index < compactedMap.length; index++) {
    const element = compactedMap[index]
    if (element === '.') break
    sum += Number(element) * index
  }
  return sum
}

export default function solution(input: string): any {
  const diskMap = input.split('').map(Number)
  return checksum(compact(expandMap(diskMap)))
}