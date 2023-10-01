export default (formatedDate) => {
    const day = new Date().getDate()
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    if (month + 1 < 10) {
        if (day < 10) {
            const date = `${year}-0${month + 1}-0${day}`
            return date
        } else {
            const date = `${year}-0${month + 1}-${day}`
            return date
        }
    } else {
        if (day + 1 < 10) {
            const date = `${year}-${month + 1}-0${day}`
            return date
        } else {
            const date = `${year}-${month + 1}-${day}`
            return date
        }
    }
}
