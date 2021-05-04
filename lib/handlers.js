const utils = require('./utils')
const multer = require('multer')
const { nanoid } = require('nanoid')
const { camelCase, kebabCase } = require('lodash')

// 画像アップロードするときのファイル名とディレクトリを指定する
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploadedImages')
  },
  filename: (req, file, cb) => {
    const prefix = `type_${req.query['relation-type']}-id_${req.query['relation-id']}`
    cb(null, `${prefix}-${file.originalname}`)
  }
})

// 画像アップロード時のストレージ設定とファイルのキー名を指定する
const upload = multer({
  storage: storage
}).single('image')

/**
 * 対象データテーブルの中から引数で指定したキーのデータとクエリパラメータが合致するデータを返す
 * @param {Object} server json-serverインスタンス
 * @param {String} tableName 対象データテーブルの名前
 * @param {Array} keyNames 検索対象データのkeyの文字の配列
 * @param {Object} options オプション
 */
const addSearchQuery = (server, tableName, keyNames, options = { removeId: false }) => {
  server.get(`/${kebabCase(tableName)}`, function (req, res) {
    const json = utils.getJsonDB()
    console.log(`${tableName} query ${keyNames} search`)

    // dateのクエリで年月を対象とする場合にtrueとなる
    let isEnabledYearMonthSearch = false
    const queryParams = []

    keyNames.filter(keyName => {
      const value = req.query[keyName]
      if (keyName === 'date' && options.yearMonthQueryKey) {
        isEnabledYearMonthSearch = true
      } else if (value) {
        queryParams.push({ key: camelCase(keyName), value })
      }
    })

    console.log(`find ${keyNames.toString()} in query parameter, ${queryParams.map(param => param.value).toString()}`)
    // クエリの全ての条件を満たすデータを配列として抽出する
    const queryData = json[tableName].filter(data => {
      const hasQueryValues = queryParams.every(queryParam => data[utils.kebabToSnake(queryParam.key)] == queryParam.value)
      if (hasQueryValues) {
        return data
      }
    })

    // isEnabledYearMonthSearchがtrueの場合は年月が該当するデータのみ抽出する
    let responseData = isEnabledYearMonthSearch ? filterYearMonth(req.query.date, options.yearMonthQueryKey, queryData) : queryData

    // 外部テーブルでの保育園idの検索オプションが有効な場合はフィルタ処理を行う
    if (options.kindergartenIdQuery && req.query['kindergarten-id']) {
      responseData = filterForeignKindergartenId(options.kindergartenIdQuery.tableName, options.kindergartenIdQuery.key, req.query['kindergarten-id'], responseData)
    }

    const partialMatchingTarget = req.query['partial-matching-target']
    if (tableName === 'kindergartens' && partialMatchingTarget) {
      responseData = responseData.filter(data => {
        const includesName = data.kindergartenName?.includes(partialMatchingTarget)
        const includesMogucareId = data.mogucareId?.includes(partialMatchingTarget)
        return includesName || includesMogucareId
      })
    }

    // テーブルからidを削除するオプションが指定された場合はレスポンスデータから削除する
    if (options.removeId == true) {
      responseData = responseData.map(data => {
        delete data.id
        return data
      })
    }

    res.jsonp(utils.enhanceResponse({ [tableName]: responseData }, 200, 'OK'))
  })
}

/**
 * クエリパラメータのitemの値に応じて、健康関連のテーブルのCRUD操作をリダイレクト処理する
 * @param {Object} server json-serverインスタンス
 * @param {String} tableNames 健康関連のテーブル名前配列
 */
const addHealthHandler = (server, tableNames) => {

  server.post(`/health`, (req, res) => {
    const item = req.query.item
    if (tableNames.includes(item)) {
      res.redirect(307, `/${item}/`)
    } else {
      res.send(404)
    }
  })

  server.get(`/health`, (req, res) => {
    const item = req.query.item
    if (tableNames.includes(item)) {
      let queryString = ''
      Object.keys(req.query).forEach(key => {
        if (key !== 'item') {
          queryString += `${key}=${req.query[key]}&`
        }
      })
      queryString.slice(0, -1)
      res.redirect(307, `/${item}?${queryString}`)
    } else {
      res.send(404)
    }
  })

  server.put(`/health`, (req, res) => {
    const item = req.query.item
    const id = req.query.id
    if (tableNames.includes(item)) {
      res.redirect(307, `/${item}/${id}`)
    } else {
      res.send(404)
    }
  })

  server.delete(`/health`, (req, res) => {
    const item = req.query.item
    const id = req.query.id
    if (tableNames.includes(item)) {
      res.redirect(307, `/${item}/${id}`)
    } else {


      res.send(404)
    }
  })
}

/**
 * 引数のデータテーブル内が関節的に参照している保育園idの値でデータを抽出して返す
 * @param {String} tableName 保育園idを検索するための外部テーブル
 * @param {String} key 外部テーブルのidと比較する元データのKey名
 * @param {String} id 検索対象のid値
 * @param {Object} originalData フィルタ対象の元データ
 */
const filterForeignKindergartenId = (tableName, key, id, originalData) => {
  const json = utils.getJsonDB()
  const foreignData = json[tableName].filter(data => data.kindergartenId == id)
  const foreignDataIds = foreignData.map(data => data[key])
  return originalData.filter(data => foreignDataIds.some(foreignId => foreignId == data[key]))
}

/**
 * 引数のデータテーブル内のuser_idが関節的に参照している保育園idの値でデータを抽出して返す
 * @param {String} yearMonth 検索対象の年月の文字列 ('yyyy-mm')
 * @param {String} kindergartenIdQuery 保育園idを検索するための外部テーブル、Key、id値を持つオブジェクト
 * @param {String} originalData フィルタ対象の元データ
 */
const filterYearMonth = (yearMonth, key, originalData) => {

  return originalData.filter(data => {
    const isSameMonth = yearMonth ? yearMonth.slice(0, 7) === data[key].slice(0, 7) : true
    if (isSameMonth) {
      return data
    }
  })
}

/**
 * 画像をアップロードするPostメソッドの処理を追加する
 * @param {Object} server json-serverインスタンス
 * @param {Object} router json-serverのrouter設定オブジェクト
 * @param {String} resource アップロードするAPIリソース名
 */
const addImageUpload = (server, router, resource) => {
  const imagesTable = resource === 'images'
  const url = imagesTable ? `/${kebabCase(resource)}` : `/${kebabCase(resource)}/image`
  const primaryKeyName = resource === 'users' ? 'userId' : 'kindergartenId'
  const data = {}
  const json = utils.getJsonDB()

  server.post(url, (req, res) => {
    console.log(`image file uploaded, resource: ${resource}`)
    const primaryKey = req.query[kebabCase(primaryKeyName)]

    if (imagesTable) {
      const relationType = Number(req.query['relation-type'])
      const relationId = req.query['relation-id']

      if (!Number.isInteger(relationType)) {
        res.status(400).json({
          status: "error",
          error: "invalid relation-type or relation-id"
        })
        return
      }

      const id = Math.max.apply(null, json[resource].map(image => image.id)) + 1
      data['id'] = id
      data['relationId'] = relationId
      data['relationType'] = relationType
    }

    upload(req, res, (err) => {
      if (err) {
        res.status(400).json({
          status: "error",
          error: "fail to upload image"
        })
      }

      const path = `http://${req.headers.host}/${req.file.destination.replace('./public/', '')}/${req.file.filename}`
      if (imagesTable) {
        data['path'] = path
        json[resource].push(data)
      } else {
        const buffer = json[resource].find(obj => obj[primaryKeyName] === primaryKey)
        json[resource] = json[resource].filter(obj => obj[primaryKeyName] === primaryKeyName)
        json[resource].push({
          ...buffer,
          image: path
        })
      }

      const singularResource = resource.slice(0, -1)

      // dbにデータを書き込む（db.jsonに直接書くとメモリとファイルの齟齬が発生する）
      router.db.assign(json).write()
      res.jsonp(utils.enhanceResponse({ [singularResource]: data }, 200, 'OK'))
    }
    )
  })
}

/**
 * login時の処理を追加する
 * @param {Object} server json-serverインスタンス
 * @param {String} secretWord jwtの暗号キー
 * @param {String} expiresIn jwtの有効期限
 */
const addLogin = (server, secretWord, expiresIn) => {
  server.post('/auth/login', (req, res) => {
    const { moguId, email, password } = req.body

    console.log(req.body)

    const authorizedUser = utils.getAuthorizedUser({ moguId, email, password })
    if (!authorizedUser) {
      const status = 401
      const message = 'Incorrect moguId or password'
      res.status(status).json({ status, message })
      return
    }

    const token = utils.createToken({ moguId, password }, secretWord, expiresIn)
    res.jsonp(utils.enhanceResponse({ user: authorizedUser, token }, 200, 'OK'))
  })
}

/**
 * サーチクエリ以外の基本的なリクエストの処理を追加する
 * @param {Object} server json-serverインスタンス
 * @param {Object} router json-serverのrouter設定オブジェクト
 * @param {String} resource アップロードするAPIリソース名
 * @param {String} singularResource アップロードするAPIリソース名の単数形
 * @param {String} primaryKeyName PKの名前
 * @param {Boolean} useNanoid PKの値にnanoidを利用する場合trueを指定する
 */
const handleRegularRequests = (server, router, resource, singularResource, primaryKeyName, useNanoid = false) => {
  server.get(`/${kebabCase(resource)}/*`, (req, res) => {
    console.log(`get data with params : ${req.params[0]}`)

    const json = utils.getJsonDB()
    const responseData = json[resource].find(data => data.id === req.params[0])

    res.jsonp(utils.enhanceResponse({ [singularResource]: responseData }, 200, 'OK'))
  })


  server.post(`/${kebabCase(resource)}/`, (req, res) => {
    console.log(`add data with custom PK: ${resource} key : ${primaryKeyName}`)

    const json = utils.getJsonDB()
    const primaryKeyValue = useNanoid ? nanoid(7) : Math.max.apply(null, json[resource].map(data => data[primaryKeyName])) + 1
    const addData = {
      id: primaryKeyValue,
      [primaryKeyName]: primaryKeyValue,
      ...req.body,
    }
    json[resource].push(addData)

    // dbにデータを書き込む（db.jsonに直接書くとメモリとファイルの齟齬が発生する）
    router.db.assign(json).write()
    res.jsonp(utils.enhanceResponse({ [singularResource]: addData }, 200, 'OK'))
  })

  server.put(`/${kebabCase(resource)}/*`, (req, res) => {
    console.log(`put data with custom PK: ${resource} key : ${primaryKeyName}`)

    const json = utils.getJsonDB()
    const putData = { ...req.body, id: req.params[0] }
    json[resource] = json[resource].filter(data => data.id !== putData.id)
    json[resource].push(putData)

    // dbにデータを書き込む（db.jsonに直接書くとメモリとファイルの齟齬が発生する）
    router.db.assign(json).write()
    res.jsonp(utils.enhanceResponse({ [singularResource]: putData }, 200, 'OK'))
  })

  server.delete(`/${kebabCase(resource)}/*`, (req, res) => {
    console.log(`delete: ${resource} key : ${primaryKeyName}`)

    const json = utils.getJsonDB()
    json[resource] = json[resource].filter(data => data.id != req.params[0])

    // dbにデータを書き込む（db.jsonに直接書くとメモリとファイルの齟齬が発生する）
    router.db.assign(json).write()
    res.jsonp(utils.enhanceResponse({ [singularResource]: {} }, 200, 'OK'))
  })

}

module.exports = {
  addSearchQuery,
  addHealthHandler,
  addImageUpload,
  addLogin,
  handleRegularRequests
}
