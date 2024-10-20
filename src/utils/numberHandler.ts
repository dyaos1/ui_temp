const numberHandler = (inputValue: string): string => {
    if (Number(inputValue)) {
        return inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
        return inputValue
    }
}

export default numberHandler;