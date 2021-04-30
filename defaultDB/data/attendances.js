const now = new Date
const year = now.getFullYear()
const month = ('00' + (now.getMonth() + 1)).slice(-2)
const monthBefore = ('00' + (now.getMonth())).slice(-2)
const day = ('00' + (now.getDate())).slice(-2)

const attendances = [
  {
    'id':'attendance001',
    'attendanceId': 'attendance001',
    'userId': 'user011',
    'kindergartenId': 'kinder1',
    'attendanceCd': 4,
    'attendanceDate': `${year}-${month}-${day}`,
    'comeHomeTime': '12:40:07',
    'lateTime': '10:25:07',
    'memo': '遅刻後に降園した。'
  },
  {
    'id': 'attendance002',
    'attendanceId': 'attendance002',
    'userId': 'user012',
    'kindergartenId': 'kinder1',
    'attendanceCd': 2,
    'attendanceDate': `${year}-${month}-${day}`,
    'comeHomeTime': null,
    'lateTime': '10:25:07',
    'memo': '遅刻。'
  },
  {
    'id': 'attendance003',
    'attendanceId': 'attendance003',
    'userId': 'user010',
    'kindergartenId': 'kinder1',
    'attendanceCd': 3,
    'attendanceDate': `${year}-${month}-${day}`,
    'comeHomeTime': null,
    'lateTime': null,
    'memo': '欠席'
  },
  {
    'id': 'attendance004',
    'attendanceId': 'attendance004',
    'userId': 'user010',
    'kindergartenId': 'kinder1',
    'attendanceCd': 3,
    'attendanceDate': `${year}-${month}-${day-1}`,
    'comeHomeTime': null,
    'lateTime': null,
    'memo': 'ページ表示時の一日前のデータ（月跨ぎだと動かないかも）'
  },
  {
    'id': 'attendance005',
    'attendanceId': 'attendance005',
    'userId': 'user014',
    'kindergartenId': 'kinder2',
    'attendanceCd': 3,
    'attendanceDate': `${year}-${month}-${day}`,
    'comeHomeTime': null,
    'lateTime': null,
    'memo': 'kinder2の園児'
  },
  {
    'id': 'attendance006',
    'attendanceId': 'attendance006',
    'userId': 'user008',
    'kindergartenId': 'kinder1',
    'attendanceCd': 4,
    'attendanceDate': `${year}-${month}-${day}`,
    'comeHomeTime': '14:25:07',
    'lateTime': null,
    'memo': '通常に登園して降園済み'
  }
  ,
  {
    'id': 'attendance007',
    'attendanceId': 'attendance007',
    'userId': 'user008',
    'kindergartenId': 'kinder1',
    'attendanceCd': 4,
    'attendanceDate': `${year}-${monthBefore}-25`,
    'comeHomeTime': '14:25:07',
    'lateTime': null,
    'memo': '表示月の前月のテストデータ。月によっては動かないかも。'
  }
]

module.exports = attendances