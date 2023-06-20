export default formatedDate => {
  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  if (month < 10) {
    const day = new Date().getDate()
    const date = `${year}-0${month + 1}-${day}`
    return date
  } else {
    const day = new Date().getDate()
    const date = `${year}-${month + 1}-${day}`
    return date
  }
}
