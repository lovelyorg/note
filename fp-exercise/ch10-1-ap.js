import { chain, compose, curry, liftN, map } from 'ramda'
import { Maybe, add, IO, Task, identity } from './support/index.js'
import { Container } from './support/container.js'

const c1 = Container.of(1)
const c2 = Container.of(2)
console.log(c1.chain((one) => c2.map(add(one))))

console.log(c1.map(add).ap(c2))

// // all together now
console.log(Container.of(2).map(add).ap(Container.of(3)))

// F.of(x).map(f) == F.of(f).ap(F.of(x))
Container.of(console.log).ap(Container.of('t'))

console.log(Maybe.of(add).ap(Maybe.of(2)).ap(Maybe.of(3)))

const liftA2 = curry(function (f, functor1, functor2) {
  return functor1.map(f).ap(functor2)
})

console.log(liftA2(add, Maybe.of(2), Maybe.of(3)))

console.log()
console.log('---------')
console.log(liftA2(add, Maybe.of(1), Container.of(1)))
console.log(liftA2(add, Container.of(1), Maybe.of(1)))
console.log(liftA2(add, Maybe.of(1), Task.of(1)).fork(identity, identity))
console.log(liftA2(add, Task.of(1), Maybe.of(1)).$value)
console.log('---------')
