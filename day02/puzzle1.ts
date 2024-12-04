export function parseInput(input: string): number[][] {
  return input.split("\n").map((value) => value.split(" ").map(Number))
}

function isReportSafe(report: number[]): boolean {
  let previousDiff = 0
  for (let index = 0; index < report.length -1; index++) {
    const currentDiff = report[index] - report[index + 1]
    if (!previousDiff) previousDiff = currentDiff
    if (
      (Math.sign(previousDiff) !== Math.sign(currentDiff)) ||
      (currentDiff === 0) ||
      (Math.abs(currentDiff) > 3)
    ) return false
    previousDiff = currentDiff
  }
  return true
}

export default function solution(input: string): any {
  const reports = parseInput(input)
  const safeReports = reports.map(isReportSafe).reduce((acc, value) => value ? acc + 1 : acc, 0)
  return safeReports
}