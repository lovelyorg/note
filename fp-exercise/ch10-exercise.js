import { add, chain, compose, concat, curry, lift, liftN, map, toUpper } from 'ramda'
import { Either, IO, Left, Maybe } from './support/index.js'
import { Container } from './support/container.js'

// Write a function that adds two possibly null numbers together using `Maybe` and `ap`.

// safeAdd :: Maybe Number -> Maybe Number -> Maybe Number
const m1 = Maybe.of(1)
const m2 = Maybe.of(2)
const m3 = Maybe.of(null)
const m4 = Maybe.of(undefined)
const safeAdd = curry((a, b) => {
  return a.map(add).ap(b) // Maybe.of(add).app(a).app(b)
})
console.log(safeAdd(m1, m2))
console.log(safeAdd(m3, m4))

// Rewrite `safeAdd` from exercise_b to use `liftA2` instead of `ap`.

// safeAdd :: Maybe Number -> Maybe Number -> Maybe Number
const liftA2 = curry((f, a, b) => {
  return a.map(f).ap(b)
})
const safeAdd2 = liftA2(add)
console.log()
console.log(safeAdd2(m1, m2))
console.log(safeAdd2(m3, m4))

// For the next exercise, we consider the following helpers:

const localStorage = {
  player1: { id: 1, name: 'Albert' },
  player2: { id: 2, name: 'Theresa' },
}

// getFromCache :: String -> IO User
const getFromCache = (x) => new IO(() => localStorage[x])

// game :: User -> User -> String
const game = curry((p1, p2) => `${p1.name} vs ${p2.name}`)

// Write an IO that gets both player1 and player2 from the cache and starts the game.

// startGame :: IO String
const startGame = IO.of(game).ap(getFromCache('player1')).ap(getFromCache('player2'))

console.log()
console.log(startGame)

console.log(liftA2(game, getFromCache('player1'), getFromCache('player2')))

console.log(startGame.unsafePerformIO())
