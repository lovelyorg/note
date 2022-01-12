import { add, compose, identity, map } from 'ramda'
import { Left, left, Right, Either, either, Task, trace } from './support/index.js'

const cacheOrFetch = (n) => {
  if (n < 10) return left(Task.of(n))
  return Either.of(
    new Task((j, s) =>
      setTimeout(() => {
        s(n)
      }, 2000)
    )
  )
}

compose(either(map(identity), map(add(1))), trace('t'), cacheOrFetch)(1).fork(identity, console.log)
compose(either(map(identity), map(add(1))), cacheOrFetch)(10).fork(identity, console.log)
