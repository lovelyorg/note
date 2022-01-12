import { map, add, toString } from './support/index.js'

class Container {
  constructor(x) {
    this.$value = x
  }
  static of(x) {
    return new Container(x)
  }
  map(f) {
    return Container.of(f(this.$value))
  }
}

const c2 = Container.of(2)

console.log(c2)

console.log(c2.map(add(1)))

console.log(map(add(1), c2))

console.log(map(toString)(c2))

export { Container }
