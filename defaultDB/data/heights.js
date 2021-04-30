const now = new Date
const year = now.getFullYear()
const month = ('00' + (now.getMonth() + 1)).slice(-2)
const monthBefore = ('00' + (now.getMonth())).slice(-2)
const day = ('00' + (now.getDate())).slice(-2)
const dayBefore = ('00' + (now.getDate()-1)).slice(-2)


const heights = [
  {
    'id': 'height001',
    'heightId': 'height001',
    'userId': 'user011',
    'height': '110',
    'date':`${year}-${month}-${day}`
  },
  {
    'id': 'height002',
    'heightId': 'height002',
    'userId': 'user012',
    'height': '112',
    'date':`${year}-${month}-${day}`
  },
  {
    'id': 'height003',
    'heightId': 'height003',
    'userId': 'user013',
    'height': '111',
    'date':`${year}-${month}-${day}`
  },
  {
    'id': 'height004',
    'heightId': 'height004',
    'userId': 'user014',
    'height': '118',
    'date':`${year}-${month}-${day}`
  },
  {
    'id': 'height005',
    'heightId': 'height005',
    'userId': 'user009',
    'height': '112',
    'date':`${year}-${month}-${day}`
  },
  {
    'id': 'height006',
    'heightId': 'height006',
    'userId': 'user008',
    'height': '115',
    'date':`${year}-${month}-${day}`
  },
  
  {
    'id': 'height007',
    'heightId': 'height007',
    'userId': 'user005',
    'height': '115',
    'date':`${year}-${monthBefore}-${day}`
  },
  {
    'id': 'height008',
    'heightId': 'height008',
    'userId': 'user005',
    'height': '115',
    'date':`${year}-${month}-${dayBefore}`
  },
]
module.exports = heights