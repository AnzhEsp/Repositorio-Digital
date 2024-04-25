
const jwt = require('jsonwebtoken')

const tokenPassword = async (id = '') => {
  const payload = { id }
  const token = jwt.sign(payload, process.env.TOKENKEY, { expiresIn: '1h' })
  return token
}
module.exports = tokenPassword
