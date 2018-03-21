module.exports = {
  toFloat: string => {
    if (Number.isNaN(Number.parseFloat(string))) return 0
    return Number.parseFloat(string)
  },

  toInt: string => {
    if (Number.isNaN(Number.parseInt(string))) return 0
    return Number.parseInt(string)
  }
}
