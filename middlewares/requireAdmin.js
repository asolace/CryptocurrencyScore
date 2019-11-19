module.exports = (req, res, next) => {
  if (!req.user.tea) {
    return res.status(401).send({ error: "Your'e not it" })
  }
  next()
}
