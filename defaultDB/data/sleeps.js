const now = new Date
const year = now.getFullYear()
const month = ('00' + (now.getMonth() + 1)).slice(-2)
const monthBefore = ('00' + (now.getMonth())).slice(-2)
const day = ('00' + (now.getDate())).slice(-2)
const dayBefore = ('00' + (now.getDate() - 1)).slice(-2)

const sleeps = [
  {
    'id': 'sleep001',
    'sleepId': 'sleep001',
    'userId': 'user011',
    'sleepQualityCd': 1,
    'bedTime': '20:30',
    'wakeUpTime': '07:30',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'sleep002',
    'sleepId': 'sleep002',
    'userId': 'user012',
    'sleepQualityCd': 2,
    'bedTime': '21:30',
    'wakeUpTime': '06:30',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'sleep003',
    'sleepId': 'sleep003',
    'userId': 'user013',
    'sleepQualityCd': 3,
    'bedTime': '22:30',
    'wakeUpTime': '08:30',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'sleep004',
    'sleepId': 'sleep004',
    'userId': 'user014',
    'sleepQualityCd': 3,
    'bedTime': '21:00',
    'wakeUpTime': '06:30',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'sleep005',
    'sleepId': 'sleep005',
    'userId': 'user008',
    'sleepQualityCd': 5,
    'bedTime': '20:45',
    'wakeUpTime': '07:15',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'sleep006',
    'sleepId': 'sleep006',
    'userId': 'user009',
    'sleepQualityCd': 4,
    'bedTime': '20:30',
    'wakeUpTime': '10:30',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'sleep007',
    'sleepId': 'sleep007',
    'userId': 'user005',
    'sleepQualityCd': 4,
    'bedTime': '20:30',
    'wakeUpTime': '10:30',
    'date': `${year}-${monthBefore}-${day}`
  },

  {
    'id': 'sleep008',
    'sleepId': 'sleep008',
    'userId': 'user005',
    'sleepQualityCd': 4,
    'bedTime': '20:30',
    'wakeUpTime': '10:30',
    'date': `${year}-${month}-${dayBefore}`
  },

]

module.exports = sleeps