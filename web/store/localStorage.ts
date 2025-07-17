export function setStringValueToLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value)
}

export function setObjectValueToLocalStorage(key: string, value: object) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function clearLocalStorageData() {
  localStorage.clear()
}
