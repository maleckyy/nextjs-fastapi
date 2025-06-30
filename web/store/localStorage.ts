export function setStringValueToLocalStorage(key: string, value: string) {
    try {
       localStorage.setItem(key, value)
    } catch (err) {
        console.log(err)
    }
}

export function setObjectValueToLocalStorage(key: string, value: object) {
    try {
       localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
        console.log(err)
    }
}

export function clearLocalStorageData() {
    localStorage.clear()
}
