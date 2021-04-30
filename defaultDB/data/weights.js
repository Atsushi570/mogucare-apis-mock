const now = new Date
const year = now.getFullYear()
const month = ('00' + (now.getMonth() + 1)).slice(-2)
const monthBefore = ('00' + (now.getMonth())).slice(-2)
const day = ('00' + (now.getDate())).slice(-2)
const dayBefore = ('00' + (now.getDate() - 1)).slice(-2)

const weights = [
  {
    'id': 'weight001',
    'weightId': 'weight001',
    'userId': 'user005',
    'weight': '10',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'weight002',
    'weightId': 'weight002',
    'userId': 'user012',
    'weight': '12',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'weight003',
    'weightId': 'weight003',
    'userId': 'user013',
    'weight': '11',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'weight004',
    'weightId': 'weight004',
    'userId': 'user014',
    'weight': '18',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'weight005',
    'weightId': 'weight005',
    'userId': 'user008',
    'weight': '12',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'weight006',
    'weightId': 'weight006',
    'userId': 'user009',
    'weight': '15',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'weight007',
    'weightId': 'weight007',
    'userId': 'user005',
    'weight': '15',
    'date': `${year}-${monthBefore}-${day}`
  },
  {
    'id': 'weight008',
    'weightId': 'weight008',
    'userId': 'user005',
    'weight': '15',
    'date': `${year}-${month}-${dayBefore}`
  },
]

module.exports = weights