export type OrganisationUnit = {
  bottomLevelCode: string
  bottomLevelName?: string
  secondLevelCode: string
  secondLevelName: string
  thirdLevelCode: string
  thirdLevelName: string
  topLevelCode: string
  topLevelName: string
  startDate?: Date
  endDate?: Date
}
