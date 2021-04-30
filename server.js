// 外部モジュールの読み込み
const jsonServer = require('json-server')
const bodyParser = require('body-parser')

// 自作モジュールの読み込み
const utils = require('./lib/utils')
const handlers = require('./lib/handlers')
const defaultDB = require('./defaultDB/index')
const constants = require('./lib/constants')

// json-serverインスタンスの作成とdbファイルパスの登録
const server = jsonServer.create()
const router = jsonServer.router(constants.dbFilePath)

// キャッシュを無効化するためのミドルウェアを定義する
const middlewares = [
  ...jsonServer.defaults(),
  ...[
    (req, res, next) => {
      router.db.assign(require('require-uncached')('./db.json')).write()
      next()
    }
  ]
]

/**
 * プログラムのエントリーポイント
 */
function main() {
  // 初期化処理を行う
  utils.initDB(defaultDB)
  server.use(middlewares)
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(bodyParser.json())

  // GETメソッドのクエリを定義する
  handlers.addSearchQuery(server, 'allergies', ['user-id'])
  handlers.addSearchQuery(server, 'attendances', ['date', 'user-id'], { kindergartenIdQuery: { tableName: 'settings', key: 'userId' }, yearMonthQueryKey: 'attendanceDate', removeId: true })
  handlers.addSearchQuery(server, 'classrooms', ['kindergarten-id'])
  handlers.addSearchQuery(server, 'events', ['date', 'kindergarten-id'], { yearMonthQueryKey: 'date', removeId: true })
  handlers.addSearchQuery(server, 'follows', ['followed-id', 'follower-id'], { removeId: true })
  constants.healthTables.forEach(table => {
    handlers.addSearchQuery(server, table, ['date', 'user-id'], { kindergartenIdQuery: { tableName: 'settings', key: 'userId' }, yearMonthQueryKey: 'date' })
  })
  handlers.addSearchQuery(server, 'kindergartenFee', ['kindergarten-id'])
  handlers.addSearchQuery(server, 'kindergartens', [])
  handlers.addSearchQuery(server, 'masterAllergies', [])
  handlers.addSearchQuery(server, 'medicals', ['user-id'], { removeId: true })
  handlers.addSearchQuery(server, 'notifications', ['date'], { yearMonthQueryKey: 'date' })
  handlers.addSearchQuery(server, 'positions', ['kindergarten-id'])
  handlers.addSearchQuery(server, 'posts', ['date', 'kindergarten-id'], { yearMonthQueryKey: 'datetime' })
  handlers.addSearchQuery(server, 'settings', ['user-id', 'kindergarten-id', 'class-id', 'position-id'], { removeId: true })
  handlers.addSearchQuery(server, 'users', ['mogu-id'], { kindergartenIdQuery: { tableName: 'settings', key: 'userId' }, removeId: true })
  handlers.addSearchQuery(server, 'vaccinations', ['user-id'], { removeId: true })

  // 健康関連のテーブルのサーチクエリ以外のAPIを定義する
  handlers.addHealthHandler(server, constants.healthTables)

  // imagesのサーチクエリ以外のAPIを定義する
  handlers.addImageUploadPost(server, router, 'images')

  // postとputでid以外の名前もPKと同等に扱るようにする
  handlers.handleRegularRequests(server, router, 'allergies', 'allergy', 'allergyId', true)
  handlers.handleRegularRequests(server, router, 'attendances', 'attendance', 'attendanceId', true)
  handlers.handleRegularRequests(server, router, 'classrooms', 'classroom', 'classId', true)
  constants.healthTables.forEach(table => {
    const endIndex = -1
    const singularResource = table.slice(0, endIndex)
    handlers.handleRegularRequests(server, router, table, singularResource, `${singularResource}Id`, true)
  })
  handlers.handleRegularRequests(server, router, 'events', 'event', 'eventId', true)
  handlers.handleRegularRequests(server, router, 'follows', 'follow', 'followId', true)
  handlers.handleRegularRequests(server, router, 'kindergartenFee', 'kindergartenFee', 'kindergartenFeeId', true)
  handlers.handleRegularRequests(server, router, 'kindergartens', 'kindergarten', 'kindergartenId', true)
  handlers.handleRegularRequests(server, router, 'masterAllergies', 'masterAllergy', 'allergyId', true)
  handlers.handleRegularRequests(server, router, 'medicals', 'medical', 'medicalId', true)
  handlers.handleRegularRequests(server, router, 'notifications', 'notification', 'notificationId', true)
  handlers.handleRegularRequests(server, router, 'positions', 'position', 'positionId', true)
  handlers.handleRegularRequests(server, router, 'posts', 'post', 'postId', true)
  handlers.handleRegularRequests(server, router, 'settings', 'setting', 'settingId', true)
  handlers.handleRegularRequests(server, router, 'users', 'user', 'userId', true)
  handlers.handleRegularRequests(server, router, 'vaccinations', 'vaccination', 'vaccinationId', true)

  // ログインのAPIを定義する
  handlers.addLogin(server, constants.SECRET_WORD, constants.expiresIn)

  // TODO: 認証有の状態を再現する必要ある場合はTokenチェックを有効にする
  // 認証を有効にした場合、loginとusers以外のapiを指定された場合、tokenをチェックする
  if (constants.isAuthorizationEnable) {
    server.use(/^(?!\/(users|api\/login)\/$)/, async (req, res, next) => {

      if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401
        const message = 'Error in authorization format'
        res.status(status).json({ status, message })
        return
      }

      try {
        await utils.verifyToken(req.headers.authorization.split(' ')[1], SECRET_WORD)
        next()
      } catch (err) {
        const status = 401
        const message = 'Error access_token is revoked'
        res.status(status).json({ status, message })
      }
    })
  }

  // json serverを起動する
  server.use(router)
  server.listen(80, function () {
    console.log('JSON Server is running')
  })
}
main()