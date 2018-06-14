export interface AdvancedTablePropertyToDisplay {
  propertyName: string
  columnTitle: string
  link?: (recordId: string, cellValue: string) => string
  defaultWidth?: string
  lookupDisplayStyle?: any // To Do: Explicitly type this!
}
