// 定数の定義
const isAuthorizationEnable = false
const dbFilePath = 'db.json'
const SECRET_WORD = 'SECRET1234'
const expiresIn = '24h'
const healthTables = ['weights', 'heights', 'temperatures', 'conditions', 'foods', 'sleeps', 'defecations']

module.exports = {
  isAuthorizationEnable,
  dbFilePath,
  SECRET_WORD,
  expiresIn,
  healthTables
}