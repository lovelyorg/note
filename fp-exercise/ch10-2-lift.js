import { add, chain, compose, concat, curry, lift, liftN, map, toUpper, identity } from 'ramda'
import { Either, IO, Left, Maybe, trace } from './support/index.js'
import { Container } from './support/container.js'

const c1 = Container.of(1)
const c2 = Container.of(2)

const liftA2 = curry(function (f, functor1, functor2) {
  return functor1.map(f).ap(functor2)
})

console.log(liftA2(add, c1, c2))

console.log(lift(add)(c1, c2))

// checkEmail :: User -> Either String Email
const checkEmail = (user) => (user.email ? Either.of(user.email) : new Left('invalid email'))
// checkName :: User -> Either String String
const checkName = (user) => (user.name ? Either.of(user.name) : new Left('invalid name'))
//  createUser :: Email -> String -> IO User
const createUser = curry(function (email, name) {
  return IO.of({ name, email })
})

const user = { name: 'tom', email: 'abc.com' }

console.log(Either.of(createUser).ap(checkEmail(user)).ap(checkName(user)))
// Left("invalid email")

console.log(liftA2(createUser, checkEmail(user), checkName(user)).map((m) => m.unsafePerformIO()))
// Left("invalid email")

console.log(c1.map(add).ap(c2))

console.log(lift(add)(c1, c2))

const cm = compose(Container.of, Maybe.of)
const cm1 = cm('abc')
const cm2 = cm('123')
console.log(liftA2(liftA2(concat), cm1, cm2))
console.log(cm1.map(liftA2(concat)).ap(cm2))
console.log(cm2.map(cm1.map(liftA2(concat)).$value))
// f m2  (  liftA2(concat) m1  )
// liftA2(concat) m1 m2
// m1.map(concat).ap(m2)
//

const m1 = Maybe.of('abc')
const m2 = Maybe.of('123')
console.log(m1.map(concat).ap(m2))

// -
// -
// -

// A.of(f).ap(A.of(x)) == A.of(f(x))

// interchange
// v.ap(A.of(x)) == A.of(function(f) { return f(x) }).ap(v)

// var v = Task.of(_.reverse);
// var x = 'Sparklehorse';

// v.ap(Task.of(x)) == Task.of(function(f) { return f(x) }).ap(v)

// -

// composition
// A.of(compose).ap(u).ap(v).ap(w) === u.ap(v.ap(w));

const u = IO.of(toUpper)
const v = IO.of(concat('blood bath '))
const w = IO.of('& beyond')

console.log(u.ap(v.ap(w)).unsafePerformIO())

console.log(liftA2(identity, v, w).unsafePerformIO())
console.log(liftA2(identity, u, liftA2(identity, v, w)).unsafePerformIO())
console.log(liftA2(identity, u, v.ap(w)).unsafePerformIO())

const vv = IO.of('blood bath ')
console.log(u.ap(liftA2(concat, vv, w)).unsafePerformIO())
console.log(liftA2(concat, vv, w).map(toUpper).unsafePerformIO())

// const liftA2 = curry(function (f, functor1, functor2) {
//   return functor1.map(f).ap(functor2)
// })

// ap(otherMaybe) {
//   return otherMaybe.map(this.$value)
// }

// map(f) {
//   return this.isNothing ? this : Maybe.of(f(this.$value))
// }
