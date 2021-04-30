const fs = require('fs')
const jwt = require('jsonwebtoken')
const { now } = require('lodash')

const constants = require('./constants')

/**
 * 引数で受け取った文字列をキャメルケースからケバブケースに変更して返す
 * @param {String} text 変更対象の文字列 
 */
const camelToKebab = (text) => {
  return text.replace(/[A-Z]/g, '-$&').toLowerCase()
}

/**
 * 引数で受け取った文字列をスネークケースからケバブケースに変更して返す
 * @param {String} text 変更対象の文字列 
 */
const kebabToSnake = (text) => {
  return text.replace(/-/gi, '_')
}

/**
 * dbファイルを読み込んでJson化して返す
 */
const getJsonDB = () => {
  const file = fs.readFileSync(constants.dbFilePath)
  try {
    return JSON.parse(file)
  }
  catch (e) {
    console.log(e)
  }
}

/**
 * DBファイルを初期化する
 * @param {String} defaultDB dbファイルの名前 
 */
const initDB = (defaultDB) => {
  fs.writeFileSync(constants.dbFilePath, JSON.stringify(defaultDB))
}

/**
 * jwt tokenを生成する
 * @param {*} payload 
 * @param {String} secretWord jwtの暗号キー
 * @param {String} expiresIn jwtの有効期限
 */
const createToken = (payload, secretWord, expiresIn) => jwt.sign(payload, secretWord, { expiresIn })

/**
 * tokenを検証する
 * @param {*} token 
 * @param {String} secretWord jwtの暗号キー
 */
const verifyToken = (token, secretWord) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, secretWord, (err, decode) =>
      decode !== undefined ? resolve(decode) : reject(err)
    )
  )

/**
* users内にmoguIdまたはemailとpasswordが合致するユーザが存在する場合にそのユーザオブジェクトを返す
* @param {Object} authData moguIdまたはemail,passwordを保持したオブジェクト
*/
const getAuthorizedUser = (authData) => {
  const json = getJsonDB(constants.dbFilePath)
  const accountId = authData.moguId ? 'moguId' : 'email'
  return json.users.find(user => user[accountId] === authData[accountId] && user.password === authData.password) 
}

/**
* バックエンドと同じ形式にレスポンスデータを拡張する
* @param {Object} data レスポンスに付与するデータ
* @param {Number} status ステータスコード
* @param {String} description description
*/
const enhanceResponse = (data, status, description) => {
  return {
    httpStatusCode: status,
    timestamp: now(),
    description,
    data
  }
}

module.exports = {
  camelToKebab,
  kebabToSnake,
  getJsonDB,
  initDB,
  createToken,
  verifyToken,
  getAuthorizedUser,
  enhanceResponse
}
