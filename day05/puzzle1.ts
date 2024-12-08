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
  const validOrders = []
  for (const order of orders) {
    const printed: number[] = []
    let valid = true
    for (const page of order) {
      if ((rules.has(page)) && (!rules.get(page)?.every((value) => !printed.includes(value)))) {
        valid = false
        break
      }
      printed.push(page)
    }
    if (valid) validOrders.push(order)
  }
  let sum = 0
  for (const order of validOrders) {
    sum += Number(order[(order.length - 1) / 2])
  }
  return sum
}