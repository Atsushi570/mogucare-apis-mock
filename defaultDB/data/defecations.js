const now = new Date
const year = now.getFullYear()
const month = ('00' + (now.getMonth() + 1)).slice(-2)
const monthBefore = ('00' + (now.getMonth())).slice(-2)
const day = ('00' + (now.getDate())).slice(-2)
const dayBefore = ('00' + (now.getDate() - 1)).slice(-2)

const defecations = [
  {
    'id': 'defecation001',
    'defecationId': 'defecation001',
    'userId': 'user011',
    'defecationCd': 1,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'defecation002',
    'defecationId': 'defecation002',
    'userId': 'user012',
    'defecationCd': 2,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'defecation003',
    'defecationId': 'defecation003',
    'userId': 'user013',
    'defecationCd': 3,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'defecation004',
    'defecationId': 'defecation004',
    'userId': 'user014',
    'defecationCd': 6,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'defecation005',
    'defecationId': 'defecation005',
    'userId': 'user009',
    'defecationCd': 5,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'defecation006',
    'defecationId': 'defecation006',
    'userId': 'user007',
    'defecationCd': 4,
    'date': `${year}-${month}-${day}`
  },
  {
    'id': 'defecation007',
    'defecationId': 'defecation007',
    'userId': 'user005',
    'defecationCd': 4,
    'date': `${year}-${monthBefore}-${day}`
  },
  {
    'id': 'defecation008',
    'defecationId': 'defecation008',
    'userId': 'user005',
    'defecationCd': 4,
    'date': `${year}-${month}-${dayBefore}`
  },
  {
    'id': 'defecation009',
    'defecationId': 'defecation009',
    'userId': 'user005',
    'defecationCd': 6,
    'date': `${year}-${month}-${day}`
  },
]

module.exports = defecations