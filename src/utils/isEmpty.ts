/* eslint-disable */
const isEmpty = (input: any) => {
    if (!input) { return true }
    if (input === "") { return true }
    return false
}

const areEmpty = (input: any[]) => {
    const arr = input.forEach((e: any) => { if (!isEmpty(e)) { return false } })
    return true
}

export { isEmpty, areEmpty }