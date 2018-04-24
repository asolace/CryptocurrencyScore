const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const UserRatingSchema = require('./UserRating')
const Coin = require('./Coin')
const ObjectId = mongoose.Schema.ObjectId
const helper = require('../helper')

const UserSchema = mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  googlePhotos: String,
  ratedCoins: [ UserRatingSchema ],
  influenceRating: { type: Number, default: 1 },
  joinDate: Date
})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.addOrUpdateUserRating = async (coinId, userId, coinRatingUpdate, cb) => {
  const userInfluenceRating = await User.findOne({ _id: userId }, 'influenceRating')
  const productOfUiAndUr = userInfluenceRating.influenceRating * helper.convertRatingLetterToNumber(coinRatingUpdate) // used for rating calculation

  const ratingData = {
    _coinId: coinId,
    rating: coinRatingUpdate,
    productOfUiAndUr: productOfUiAndUr,
    userUi: userInfluenceRating.influenceRating,
    addedDate: Date.now()
  }

  ratingData.deleted = coinRatingUpdate === 'N'

  const query = { _id: userId, 'ratedCoins._coinId': coinId }

  User.findOne(query, (err, user) => {
    if (err) console.log(`Error in finding user from updating coin: ${err}`)

    if (!user) { // Saves Data
      const add = { $addToSet: { ratedCoins: ratingData }}
      User.update({ _id: userId, 'ratedCoins._coinId': { $ne: coinId }}, add, { upsert: true }, (err, user) => {
        if (err) console.log(`Error in pushing user rating coin: ${err}`)
        Coin.addUserToCoinRatedByArray(ratingData, userId, cb)
      })
    } else { // Updates Data
      let update = {
        'ratedCoins.$.rating': coinRatingUpdate,
        'ratedCoins.$.productOfUiAndUr': productOfUiAndUr,
        'ratedCoins.$.userUi': userInfluenceRating.influenceRating,
      }

      update['ratedCoins.$.deleted'] = coinRatingUpdate === 'N'

      User.updateOne(query, { $set: update }, (err, user) => {
        if (err) console.log(`Error in updating user rating coin: ${err}`)

        let resposeMessage = { success: true, message: 'Coin rating update success'}
        cb(resposeMessage, ratingData)
      })
    }
  })
}

module.exports.getUserData = async (_id, cb) => {
  UserIdToSearch = mongoose.Types.ObjectId(_id)

  const result = await User.aggregate([
    { $match: { _id: UserIdToSearch }},
    { $addFields: {
      'ratedCoins': {
        $filter: {
          input: '$ratedCoins',
          as: 'ratedCoins',
          cond: { $eq: ['$$ratedCoins.deleted', false]}
        }
      }
    }}
  ])

  cb(result[0])
}

module.exports.getUserRatingList = async (_id, cb) => {
  UserIdToSearch = mongoose.Types.ObjectId(_id)

  const result = await User.aggregate([
    { $match: { _id: UserIdToSearch }},
    { $addFields: {
      'ratedCoins': {
        $filter: {
          input: '$ratedCoins',
          as: 'ratedCoins',
          cond: { $eq: ['$$ratedCoins.deleted', false]}
        }
      }
    }},
    { $unwind: '$ratedCoins' },
    { $project: { ratedCoins: '$ratedCoins' }},
    { $lookup:
      {
        from: 'coins',
        localField: 'ratedCoins._coinId',
        foreignField: '_id',
        as: 'coin'
      }
    },
    { $unwind: '$coin'},
    { $project:
      {
        _id: '$coin._id',
        userRating: '$ratedCoins.rating',
        name: '$coin.name',
        symbol: '$coin.symbol',
        logo: '$coin.logo',
        price_usd: '$coin.price_usd',
        percent_change_24h: '$coin.percent_change_24h',
        ratedBy: '$coin.ratedBy'
      }
    }
  ])

  cb(result)
}
