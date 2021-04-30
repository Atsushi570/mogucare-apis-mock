const users = require('./data/users')
const settings = require('./data/settings.js')
const kindergartens = require('./data/kindergartens')
const attendances = require('./data/attendances')
const posts = require('./data/posts')
const notifications = require('./data/notifications')
const vaccinations = require('./data/vaccinations')
const medicals = require('./data/medicals')
const allergies = require('./data/allergies')
const masterAllergies = require('./data/masterAllergies')
const kindergartenFee = require('./data/kindergartenFee')
const follows = require('./data/follows')
const events = require('./data/events')
const weights = require('./data/weights')
const temperatures = require('./data/temperatures')
const conditions = require('./data/conditions')
const heights = require('./data/heights')
const classrooms = require('./data/classrooms')
const positions = require('./data/positions')
const foods = require('./data/foods')
const sleeps = require('./data/sleeps')
const defecations = require('./data/defecations')
const images = require('./data/images')

const db = {
  users,
  settings,
  kindergartens,
  attendances,
  posts,
  notifications,
  vaccinations,
  masterAllergies,
  medicals,
  allergies,
  kindergartenFee,
  events,
  follows,
  weights,
  heights,
  temperatures,
  conditions,
  classrooms,
  positions,
  foods,
  sleeps,
  defecations,
  images
}

module.exports = db