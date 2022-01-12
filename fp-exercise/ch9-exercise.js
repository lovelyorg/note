import _, { chain, compose, last, map, split } from 'ramda'
import { Either, IO, Left, safeProp, trace } from './support/index.js'

const join = (mma) => mma.join()

// Considering a User object as follow:
const user = {
  id: 1,
  name: 'Albert',
  address: {
    street: {
      number: 22,
      name: 'Walnut St',
    },
  },
}

// Use `safeProp` and `map/join` or `chain` to safely get the street name when given a user

// getStreetName :: User -> Maybe String
const getStreetName = compose(chain(safeProp('name')), chain(safeProp('street')), safeProp('address'))
console.log(getStreetName(user))

const getStreetName2 = compose(join, map(safeProp('name')), chain(safeProp('street')), safeProp('address'))
console.log(getStreetName2(user))

//
//
//

// We now consider the following items:

// getFile :: IO String
const getFile = IO.of('home/mostly-adequate/ch09.md')

// pureLog :: String -> IO ()
const pureLog = (str) => new IO(() => console.log(typeof str, str))

/**
 * Use getFile to get the filepath, remove the directory and keep only the basename, then purely log it.
 * Hint: you may want to use `split` and `last` to obtain the basename from a filepath.
 */

// logFilename :: IO ()
const baseName = compose(last, split('/'))
const logFilename = compose(chain(pureLog), trace('t1'), map(baseName))(getFile)

console.log(logFilename)
console.log(logFilename.unsafePerformIO())

// -
// -
// -

// For this exercise, we consider helpers with the following signatures:

// validateEmail :: Email -> Either String Email
const validateEmail = (email) => (email ? Either.of(email) : new Left('invalid email'))
// addToMailingList :: Email -> IO([Email])
const addToMailingList = (email) => IO.of([email])
// emailBlast :: [Email] -> IO ()
const emailBlast = (emails) => new IO(() => emails.forEach((email) => console.log(`notice ${email}`)))

/**
 * Use `validateEmail`, `addToMailingList` and `emailBlast` to create a function which adds a
 * new email to the mailing list if valid, and then notify the whole list.
 */

// joinMailingList :: Email -> Either String (IO ())
const joinMailingList = compose(map(compose(join, map(emailBlast), addToMailingList)), validateEmail)

// const joinMailingList = compose(map(compose(chain(emailBlast), addToMailingList)), validateEmail)

console.log(joinMailingList({ email: '123.com' }))
// console.log(joinMailingList(null))
