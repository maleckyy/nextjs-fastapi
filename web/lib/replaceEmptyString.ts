export function replaceEmptyString(text: string | undefined, replaceText: string = "-"): string {
  if (text === undefined || text.trim() === "") {
    return replaceText
  } else {
    return text
  }
}