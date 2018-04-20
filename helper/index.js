module.exports = {
  toFloat: string => {
    if (Number.isNaN(Number.parseFloat(string))) return 0
    return Number.parseFloat(string)
  },

  toInt: string => {
    if (Number.isNaN(Number.parseInt(string))) return 0
    return Number.parseInt(string)
  },

  convertRatingLetterToNumber: ratingLetter => {
    switch (ratingLetter) {
      case 'A':
        return 100
      case 'B':
        return 80
      case 'C':
        return 60
      case 'D':
        return 40
      case 'F':
        return 20
      case 'N':
        return 1
      default:
        return 1
    }
  },

  convertRatingNumberToLetter: ratingFloat => {
    switch (true) {
      case (ratingFloat > 80):
        return 'A'
      case (ratingFloat > 60 && ratingFloat <= 80):
        return 'B'
      case (ratingFloat > 40 && ratingFloat <= 60):
        return 'C'
      case (ratingFloat > 20 && ratingFloat <= 40):
        return 'D'
      case (ratingFloat > 1 && ratingFloat <= 20):
        return 'F'
      case (ratingFloat <= 1):
        return 'N'
      default:
        return 'N'
    }
  },

  calculateRatingAsNumber: (sumProdUiUr, sumUi) => {
    if (sumUi === 0) return 1
    return parseFloat(sumProdUiUr / sumUi)
  }
}
