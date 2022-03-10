const multipleSpacesRegex = /\s\s+/g

export default (originalString: string) =>
  originalString ? originalString.replace(multipleSpacesRegex, " ").trim() : originalString
