const now = new Date
const year = now.getFullYear()
const month = ('00' + (now.getMonth() + 1)).slice(-2)
const monthBefore = ('00' + (now.getMonth())).slice(-2)
const day = ('00' + (now.getDate())).slice(-2)
const dayBefore = ('00' + (now.getDate() - 1)).slice(-2)



const conditions = [
  {
    'id': 'condition001',
    'conditionId': 'condition001',
    'userId': 'user005',
    'conditionCd': 1,
    'symptomCd': null,
    'memo': 'conditionCd 1',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'condition002',
    'conditionId': 'condition002',
    'userId': 'user006',
    'conditionCd': 2,
    'symptomCd': null,
    'memo': 'conditionCd 2',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'condition003',
    'conditionId': 'condition003',
    'userId': 'user007',
    'conditionCd': 3,
    'symptomCd': 1,
    'memo': 'conditionCd 3, symptomCd: 1',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'condition004',
    'conditionId': 'condition004',
    'userId': 'user008',
    'conditionCd': 3,
    'symptomCd': 2,
    'memo': 'conditionCd 3, symptomCd: 2',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'condition005',
    'conditionId': 'condition005',
    'userId': 'user014',
    'conditionCd': 3,
    'symptomCd': 2,
    'memo': 'conditionCd 3, symptomCd: 2',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'condition006',
    'conditionId': 'condition006',
    'userId': 'user009',
    'conditionCd': 3,
    'symptomCd': 3,
    'memo': 'conditionCd 3, symptomCd: 3',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'condition007',
    'conditionId': 'condition007',
    'userId': 'user010',
    'conditionCd': 3,
    'symptomCd': 4,
    'memo': 'conditionCd 3, symptomCd: 4',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'condition008',
    'conditionId': 'condition008',
    'userId': 'user005',
    'conditionCd': 1,
    'symptomCd': null,
    'memo': '',
    'date': `${year}-${monthBefore}-${dayBefore}`
  },
  {
    'id': 'condition009',
    'conditionId': 'condition009',
    'userId': 'user005',
    'conditionCd': 3,
    'symptomCd': 7,
    'memo': 'conditionCd 3, symptomCd: 7',
    'date': `${year}-${month}-${dayBefore}`
  },
  {
    'id': 'condition010',
    'conditionId': 'condition010',
    'userId': 'user011',
    'conditionCd': 3,
    'symptomCd': 5,
    'memo': 'conditionCd 3, symptomCd: 5',
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'condition011',
    'conditionId': 'condition011',
    'userId': 'user012',
    'conditionCd': 3,
    'symptomCd': 6,
    'memo': 'conditionCd 3, symptomCd: 6',
    'date': `${year}-${month}-${day}`
  },
]

module.exports = conditions