const numberHandler = (inputValue: string): string => {
    const replaced = inputValue.replace(",", "")
    if (Number(replaced)) {
        return replaced.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
        return replaced
    }
}

export default numberHandler;