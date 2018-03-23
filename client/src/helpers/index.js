module.exports = {
  // Capitalize the string
  capitalize: string => string.charAt(0).toUpperCase() + string.slice(1),

  // If data is below 0 change color to red
  // If data is above 0 change color to green
  colorChange: data => data > 0 ? "positive-change" : "negative-change",

  //Formats to 2016-01-01T00:00:00
  getPreviousDateISO: daysToGoBack => {
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate() - daysToGoBack

    day = day < 10 ? `0${day}` : day
    month = month < 10 ? `0${month}` : month

    let newDate = `${year}-${month}-${day}T00:00:00`

    return newDate
  },

  isNA: string => {
    if (string === "" || undefined) return "N/A"
    else return string
  },

  // Sets the color of the rating
  renderRatingBox: rating => {
    switch (rating) {
      case "A":
      return "gb-a"
      case "B":
      return "gb-b"
      case "C":
      return "gb-c"
      case "D":
      return "gb-d"
      case "F":
      return "gb-f"
      case "N":
      return "gb-n"
      default:
      return "gb-n"
    }
  },

  renderWebUrl: string => {
    if (string === undefined) return 'N/A'
    let href = string.split(' ')[1]
    let webUrl = href.split("'")[1]
    return webUrl
  },

  // Adds comma , to the number
  stringToUSD: number => {
    if (number === undefined) return ''

    let string = number.toString()
    if (string.split('.').length > 1) {
      let dollar = string.split('.')[0]
      let cent = string.split('.')[1]
      let parseDollar = dollar.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

      return `$${parseDollar}.${cent}`
    } else {
      return `$${string.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    }
  },

  // Sorts Numerically
  sortNumber: (sortOrder, a, b, sortId) => sortOrder ? a[sortId] - b[sortId] : b[sortId] - a[sortId],

  // Sorts Alpahbetically
  sortString: (sortOrder, a, b, type) => {
    if (sortOrder) {
      if(a[type].toLowerCase() < b[type].toLowerCase()) return -1
      if(a[type].toLowerCase() > b[type].toLowerCase()) return 1
      return 0
    } else {
      if(a[type].toLowerCase() < b[type].toLowerCase()) return 1
      if(a[type].toLowerCase() > b[type].toLowerCase()) return -1
      return 0
    }
  },

  // Parse UTC to Date string
  utcToDate: string => {
    let date = new Date(parseInt(string, 10) * 1000)
    return date.toString()
  }

}
