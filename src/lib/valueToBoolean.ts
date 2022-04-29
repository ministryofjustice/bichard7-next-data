export default (value?: string | boolean | null): boolean | undefined => {
  if (value === undefined || value === null || value === "null") {
    return undefined
  }
  return ["Y", "y", true, "Rec"].includes(value)
}
