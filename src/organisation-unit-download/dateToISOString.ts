const dateToISOString = (value: any): string | undefined => {
  let result: Date | undefined

  if (typeof value === "string") {
    result = new Date(value)
  } else if (typeof value === "number") {
    result = new Date((value - (25567 + 2)) * 86400 * 1000)
  }

  if (result instanceof Date) {
    return Number.isNaN(result.getTime()) ? undefined : result.toISOString()
  }

  return undefined
}

export default dateToISOString
