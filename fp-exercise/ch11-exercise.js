import { chain, compose, concat, curry, lift, liftN, map, always, prop, split, identity } from 'ramda'
import { Either, IO, Maybe, either, Task, left, id } from './support/index.js'

// Write a natural transformation that converts `Either b a` to `Maybe a`

// eitherToMaybe :: Either b a -> Maybe a
let eitherToMaybe = (x) => Maybe.of(x.isLeft ? null : x.$value)
eitherToMaybe = either(always(Maybe.of(null)), Maybe.of)
console.log(eitherToMaybe(Either.of('abc')))
console.log(eitherToMaybe(left('abc')))

// -
// -

// eitherToTask :: Either a b -> Task a b
const eitherToTask = either(Task.rejected, Task.of)

// Using `eitherToTask`, simplify `findNameById` to remove the nested `Either`.

// Task.rejected(1).fork(console.error)
// Task.of(2).fork(console.error,console.log)

// number -> either(string user)
const findUser = (id) => {
  const users = [
    { id: 1, name: 'tom' },
    { id: 2, name: 'jerry' },
  ]
  const user = users.find((x) => x.id == id)
  return user ? Either.of(user) : left('user not found')
}

const newWork = 0
// number -> promise either(string user) string
const fetchUser = (id) => new Promise((s, j) => (newWork ? s(findUser(id)) : j({ test: '系统繁忙' })))

// number -> task string (either string user)
const findUserById = (id) => new Task((fail, ok) => fetchUser(id).then(ok).catch(fail))
findUserById(2).fork(console.log, either(console.log, console.log))

// Number -> Task Error (Either Error string)
let findNameById = compose(map(map(prop('name'))), findUserById)
// console.log(findNameById(2))
findNameById(2).fork(
  console.error,
  either(console.error, (x) => console.log('hi, im', x))
)

findNameById = compose(map(prop('name')), chain(eitherToTask), findUserById)
findNameById(1).fork(console.error, (x) => console.log('hi, im', x))
findNameById(3).fork(console.error, (x) => console.log('hi, im', x))

// -
// -

// As a reminder, the following functions are available in the exercise's context:

// split :: String -> String -> [String]

// intercalate :: String -> [String] -> String
const intercalate = curry((str, xs) => xs.join(str))

// Write the isomorphisms between String and [Char].

// strToList :: String -> [Char]
const strToList = split('')
// listToStr :: [Char] -> String
const listToStr = intercalate('')

console.log(compose(listToStr, strToList)('abc'))
