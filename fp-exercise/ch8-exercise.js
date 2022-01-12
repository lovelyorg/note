import { add, append, compose, concat, curry, head, identity, map, prop } from 'ramda'
import { Maybe, Either, Left, Right, either, left, trace, IO, chain } from './support/index.js'
import { Container } from './support/container.js'

// Use `add` and `map` to make a function that increments a value inside a functor.

// incrF :: Functor f => f Int -> f Int
const incrF = map(add(1))
console.log(incrF(Container.of(1)))

//
// ---
//

// Given the following User object:
const user = { id: 2, name: 'Albert', active: true }

// Use `safeProp` and `head` to find the first initial of the user.

// string -> object -> Maybe a
const safeProp = curry((p, obj) => Maybe.of(prop(p, obj)))

// safeProp :: String -> Object -> Maybe a
//const safeProp = curry((p, obj) => compose(Maybe.of, prop(p))(obj));

// initial :: User -> Maybe String
const initial = compose(map(head), safeProp('name'))
console.log(initial(user))

//
// ---
//

// Given the following helper functions:

// showWelcome :: User -> String
const showWelcome = compose(concat('Welcome '), prop('name'))

// checkActive :: User -> Either String User
const checkActive = function checkActive(user) {
  return user.active ? Either.of(user) : left('Your account is not active')
}

// Write a function that uses `checkActive` and `showWelcome` to grant access or return the error.
// eitherWelcome :: User -> Either String String
const eitherWelcome = compose(map(showWelcome), checkActive)
console.log(eitherWelcome(user))
console.log(eitherWelcome({ user }))

// User -> string
// const eitherWelcome = (user) => either(identity, showWelcome, checkActive(user))

// -
// -
// -

// We now consider the following functions:

// validateUser :: (User -> Either String ()) -> User -> Either String User
const validateUser = curry((validate, user) => validate(user).map(() => user))

// save :: User -> IO User
const save = (user) => new IO(() => ({ ...user, saved: true }))

/**
 * Write a function `validateName` which checks whether a user has a name longer than
 * 3 characters or return an error message. Then use `either`, `showWelcome` and `save`
 * to write a `register` function to signup and welcome a user when the validation is ok.
 * Remember either's two arguments must return the same type.
 */
// validateName :: User -> Either String ()
const validateName = ({ name }) => {
  if (name && name.length > 3) return Either.of(null)
  return left('Name need to be > 3')
}

// register :: User -> IO String
const saveAndWelcome = compose(map(showWelcome), trace('trace1'), save)
const register = compose(either(IO.of, saveAndWelcome), validateUser(validateName))
console.log(register(user).unsafePerformIO())
console.log(register({}).unsafePerformIO())
