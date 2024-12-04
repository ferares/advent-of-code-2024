import { parseInput } from "./puzzle1"

function isReportSafe(report: number[], dampenerUsed: boolean = false): boolean {
  let previousDiff = 0
  for (let index = 0; index < report.length -1; index++) {
    const currentDiff = report[index] - report[index + 1]
    if (!previousDiff) previousDiff = currentDiff
    if (
      (Math.sign(previousDiff) !== Math.sign(currentDiff)) ||
      (currentDiff === 0) ||
      (Math.abs(currentDiff) > 3)
    ) {
      if (dampenerUsed) return false
      const dampenedReport1 = [...report]
      const dampenedReport2 = [...report]
      const dampenedReport3 = [...report]
      dampenedReport1.splice(index, 1)
      dampenedReport2.splice(index + 1, 1)
      dampenedReport3.splice(index - 1, 1)
      if (
        (isReportSafe(dampenedReport1, true)) ||
        (isReportSafe(dampenedReport2, true)) ||
        (isReportSafe(dampenedReport3, true))
      ) {
        return true
      }
      return false
    }
    previousDiff = currentDiff
  }
  return true
}

export default function solution(input: string): any {
  const reports = parseInput(input)
  const safeReports = reports.map((report) => isReportSafe(report)).reduce((acc, value) => value ? acc + 1 : acc, 0)
  return safeReports
}