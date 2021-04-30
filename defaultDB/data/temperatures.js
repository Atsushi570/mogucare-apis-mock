const now = new Date
const year = now.getFullYear()
const month = ('00' + (now.getMonth() + 1)).slice(-2)
const monthBefore = ('00' + (now.getMonth())).slice(-2)
const day = ('00' + (now.getDate())).slice(-2)
const dayBefore = ('00' + (now.getDate()-1)).slice(-2)

const temperatures = [
  {
    'id': 'temperature001',
    'temperatureId': 'temperature001',
    'userId': 'user011',
    'temperature': '36.7',
    'date':`${year}-${month}-${day}`
  },
  {
    'id': 'temperature002',
    'temperatureId': 'temperature002',
    'userId': 'user012',
    'temperature': '36.0',
    'date':`${year}-${month}-${day}`
  },
  {
    'id': 'temperature003',
    'temperatureId': 'temperature003',
    'userId': 'user013',
    'temperature': '36.2',
    'date':`${year}-${month}-${day}`
  },
  {
    'id': 'temperature004',
    'temperatureId': 'temperature004',
    'userId': 'user014',
    'temperature': '36.4',
    'date':`${year}-${month}-${day}`
  },
  {
    'id': 'temperature005',
    'temperatureId': 'temperature005',
    'userId': 'user009',
    'temperature': '37.2',
    'date':`${year}-${month}-${day}`
  },
  {
    'id': 'temperature006',
    'temperatureId': 'temperature006',
    'userId': 'user008',
    'temperature': '36.0',
    'date':`${year}-${month}-${day}`
  },
  {
    'id': 'temperature007',
    'temperatureId': 'temperature007',
    'userId': 'user005',
    'temperature': '36.0',
    'date':`${year}-${monthBefore}-${day}`
  },
  {
    'id': 'temperature008',
    'temperatureId': 'temperature008',
    'userId': 'user005',
    'temperature': '36.0',
    'date':`${year}-${month}-${dayBefore}`
  },
]

module.exports = temperatures