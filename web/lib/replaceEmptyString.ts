export function replaceEmptyString(text: string | undefined, replaceText: string = "-"): string {
  if (text === undefined || text === null) {
    return replaceText
  }
  else if (text.trim() === "") {
    return replaceText
  }
  else {
    return text
  }
}