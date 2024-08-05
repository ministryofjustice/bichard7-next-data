const valueToDate = (value: any): Date | undefined => {
  let result: Date | undefined

  if (value === undefined || value === "" || value === null) {
    return undefined
  }

  if (typeof value === "string") {
    result = new Date(value)
  } else if (typeof value === "number") {
    result = new Date((value - (25567 + 2)) * 86400 * 1000)
  }

  if (result instanceof Date && Number.isNaN(result.getTime())) {
    console.log(`INVALID DATE FORMAT: ${value}`)
    return undefined
  }
  return result
}

export default valueToDate
