const now = new Date
const year = now.getFullYear()
const month = ('00' + (now.getMonth() + 1)).slice(-2)

const posts = [
  {
    'id': 'post001',
    'postId': 'post001',
    'userId': 'user001',
    'kindergartenId' : 'kinder1',
    'title': '12月10日の参観日について',
    'content': 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    'datetime': `${year}-${month}-11 16:20:07`
  },
  {
    'id': 'post002',
    'postId': 'post002',
    'userId': 'user001',
    'kindergartenId' : 'kinder1',
    'title': '2回目のお知らせ',
    'content': 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    'datetime': `${year}-${month}-07 12:30:07`
  },
  {
    'id': 'post003',
    'postId': 'post003',
    'userId': 'user001',
    'kindergartenId' : 'kinder1',
    'title': '3回目のお知らせ',
    'content': 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    'datetime': `${year}-${month}-25 12:30:07`
  },
  {
    'id': 'post004',
    'postId': 'post004',
    'userId': 'user001',
    'kindergartenId' : 'kinder1',
    'title': '4回目のお知らせ',
    'content': 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    'datetime': `${year}-${month}-25 13:30:07`
  },
  {
    'id': 'post005',
    'postId': 'post005',
    'userId': 'user001',
    'kindergartenId' : 'kinder1',
    'title': '5回目のお知らせ',
    'content': 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    'datetime': `${year}-${month}-07 12:30:07`
  },
  {
    'id': 'post006',
    'postId': 'post006',
    'userId': 'user004',
    'kindergartenId' : 'kinder2',
    'title': '6回目のお知らせ',
    'content': 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    'datetime': `${year}-${month}-07 12:50:07`
  }
]

module.exports = posts