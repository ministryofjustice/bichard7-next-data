import valueToDate from "./valueToDate"

const isActiveOrganisationUnit = (start?: string, end?: string): boolean => {
  const startDate = valueToDate(start)
  const endDate = valueToDate(end)
  const currentDate = new Date()
  if (
    startDate &&
    startDate.getTime() <= currentDate.getTime() &&
    (endDate === undefined || endDate.getTime() >= new Date().getTime())
  ) {
    return true
  }
  return false
}

export default isActiveOrganisationUnit
