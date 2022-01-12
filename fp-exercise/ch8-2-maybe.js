import { compose, identity, curry, prop, map, chain, ap } from 'ramda'

class Maybe {
  constructor(x) {
    this.$value = x
  }

  static of(x) {
    return new Maybe(x)
  }

  get isNothing() {
    return this.$value === null || this.$value === undefined
  }

  map(f) {
    return this.isNothing ? this : Maybe.of(f(this.$value))
  }

  join() {
    return this.isNothing ? this : this.$value
  }

  chain(f) {
    return this.map(f).join()
  }

  ap(otherMaybe) {
    return otherMaybe.map(this.$value)
  }
}

export const safeProp = curry((p, obj) => Maybe.of(prop(p, obj)))

const join = (mma) => mma.join()

console.log(Maybe.of(1).map(identity))
console.log(Maybe.of(null).map(identity))
console.log(compose(safeProp('a'))({ a: { b: 2 } }))
console.log(compose(map(safeProp('b')), safeProp('a'))({ a: { b: 2 } }))
console.log(compose(join, map(safeProp('b')), safeProp('a'))({ a: { b: 2 } }))
console.log(compose(chain(safeProp('b')), safeProp('a'))({ a: { b: 2 } }))
