import { curry, identity } from 'ramda'
import { Task, add } from './support/index.js'

const nested = Task.of(1)

nested.map(add(1)).fork(null, console.log)

// getJSON :: String -> {} -> Task Error JSON
const getJSON = curry(
  (url, params) =>
    new Task((reject, result) => {
      setTimeout(() => {
        // reject(400)
        result(200)
      }, 1000)
    })
)

getJSON('/video', { id: 10 }).fork(console.log, console.log)
