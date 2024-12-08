export default function solution(input: string): any {
  const lines = input.split('\n')
  const rules: Map<number, number[]> = new Map()
  const orders: number[][] = []
  let parsingOrders = false
  for (const line of lines) {
    if (line === '') {
      parsingOrders = true
      continue
    }
    if (parsingOrders) orders.push(line.split(',').map(Number))
    else {
      const [first, second] = line.split('|').map(Number)
      if (!rules.has(first)) rules.set(first, [])
        rules.get(first)?.push(second)
    }
  }
  const invalidOrders = []
  for (const order of orders) {
    let printed: number[] = []
    let valid = true
    for (let pageIndex = 0; pageIndex < order.length;) {
      const page = order[pageIndex]
      if ((rules.has(page)) && (!rules.get(page)?.every((value) => !printed.includes(value)))) {
        const error = rules.get(page)?.find((value) => printed.includes(value)) as number
        const errorIndex = order.indexOf(error)
        order[pageIndex] = error
        order[errorIndex] = page
        valid = false
        printed = []
        pageIndex = 0
        continue
      }
      printed.push(page)
      pageIndex++
    }
    if (!valid) invalidOrders.push(order)
  }
  let sum = 0
  for (const order of invalidOrders) {
    sum += Number(order[(order.length - 1) / 2])
  }
  return sum
}