const now = new Date
const year = now.getFullYear()
const month = ('00' + (now.getMonth() + 1)).slice(-2)

const notifications = [
  {
    'id': 'notification001',
    'notificationId': 'notification001',
    'type': 1,
    'title': '重要なお知らせ',
    'content': 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    'date': `${year}-${month}-11`,
    'createAt': `${year}-${month}-11 16:20:07`
  },
  {
    'id': 'notification002',
    'notificationId': 'notification002',
    'type': 2,
    'title': 'アップデートのお知らせ',
    'content': 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    'date': `${year}-${month}-07`,
    'createAt': `${year}-${month}-07 12:30:07`
  },
  {
    'id': 'notification003',
    'notificationId': 'notification003',
    'type': 3,
    'title': 'キャンペーンのお知らせ',
    'content': 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    'date': `${year}-${month}-25`,
    'createAt': `${year}-${month}-25 12:30:07`
  },
  {
    'id': 'notification004',
    'notificationId': 'notification004',
    'type': 4,
    'title': 'プロモーションのお知らせ',
    'content': 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    'date': `${year}-${month}-25`,
    'createAt': `${year}-${month}-25 13:30:07`
  },
  {
    'id': 'notification005',
    'notificationId': 'notification005',
    'type': 1,
    'title': '重要なお知らせ',
    'content': 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    'date': `${year}-${month}-07`,
    'createAt': `${year}-${month}-07 12:30:07`
  },
  {
    'id': 'notification006',
    'notificationId': 'notification006',
    'type': 2,
    'title': 'アップデートのお知らせ',
    'content': 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    'date': `${year}-${month}-07`,
    'createAt': `${year}-${month}-07 12:50:07`
  }
]

module.exports = notifications