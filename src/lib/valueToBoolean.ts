export default (value?: string | boolean | null): boolean | undefined => {
  if (value === undefined || value === null) {
    return undefined
  }

  const trimmedValue = typeof value === "string" ? value.trim().toLowerCase() : value

  if (["y", true, "r", "rec", "yes"].includes(trimmedValue)) {
    return true
  }
  if (["n", "no", false, "nr", "mr"].includes(trimmedValue)) {
    return false
  }
  return undefined
}
