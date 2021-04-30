const now = new Date
const year = now.getFullYear()
const month = ('00' + (now.getMonth() + 1)).slice(-2)
const monthBefore = ('00' + (now.getMonth())).slice(-2)
const day = ('00' + (now.getDate())).slice(-2)
const dayBefore = ('00' + (now.getDate() - 1)).slice(-2)

const foods = [
  {
    'id': 'food001',
    'foodId': 'food001',
    'userId': 'user011',
    'foodCd': 1,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'food002',
    'foodId': 'food002',
    'userId': 'user012',
    'foodCd': 2,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'food003',
    'foodId': 'food003',
    'userId': 'user013',
    'foodCd': 3,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'food004',
    'foodId': 'food004',
    'userId': 'user014',
    'foodCd': 3,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'food005',
    'foodId': 'food005',
    'userId': 'user009',
    'foodCd': 5,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'food006',
    'foodId': 'food006',
    'userId': 'user008',
    'foodCd': 4,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'food007',
    'foodId': 'food007',
    'userId': 'user005',
    'foodCd': 4,
    'date': `${year}-${monthBefore}-${day}`
  },
  {
    'id': 'food008',
    'foodId': 'food008',
    'userId': 'user005',
    'foodCd': 4,
    'date': `${year}-${month}-${dayBefore}`
  },
  {
    'id': 'food009',
    'foodId': 'food009',
    'userId': 'user005',
    'foodCd': 1,
    'date': `${year}-${month}-${day}`
  },
  
  {
    'id': 'food010',
    'foodId': 'food010',
    'userId': 'user005',
    'foodCd': 7,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'food011',
    'foodId': 'food011',
    'userId': 'user005',
    'foodCd': 8,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'food012',
    'foodId': 'food012',
    'userId': 'user005',
    'foodCd': 9,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'food013',
    'foodId': 'food013',
    'userId': 'user005',
    'foodCd': 10,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'food013',
    'foodId': 'food013',
    'userId': 'user005',
    'foodCd': 10,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'food014',
    'foodId': 'food014',
    'userId': 'user005',
    'foodCd': 11,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'food015',
    'foodId': 'food015',
    'userId': 'user005',
    'foodCd': 12,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'food016',
    'foodId': 'food016',
    'userId': 'user005',
    'foodCd': 5,
    'date': `${year}-${month}-${day}`
  },

]

module.exports = foods