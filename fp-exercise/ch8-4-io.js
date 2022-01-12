import { curry, compose, prop, split, last, map, head, equals, find, replace, nth } from 'ramda'
import { trace, Maybe } from './support/index.js'

class IO {
  constructor(x) {
    this.unsafePerformIO = x
  }

  static of(x) {
    return new IO(() => x)
  }

  map(f) {
    return new IO(compose(f, this.unsafePerformIO))
  }
}

console.log(new IO(() => 1).map((m) => m + 2).unsafePerformIO())

// http://localhost/???a=1&b=2?c=3&d=4
// const window = { location: { href: 'localhost://test?a=1&b=2' } }
const window = { location: { href: 'http://localhost/???a=1&b=2?c=3&e&&&d=4&' } }

const ioWindow = IO.of(window)

console.log(ioWindow, ioWindow.map(prop('location')).map(prop('href')).map(split('?')).unsafePerformIO())

// IO string
// const url = new IO(() => window.location.href)
const url = map(compose(prop('href'), prop('location')), ioWindow)

// string -> [[string]]
const params = compose(map(split('=')), split('&'), trace('tarceA'), replace(/^[^?]+\?/, ''))

// string -> string
var findParam = (key) =>
  map(compose(map(nth(1)), Maybe.of, find(compose(equals(key), head)), trace('tarce1'), params), url)

console.log(findParam('a').unsafePerformIO().$value)
// console.log(findParam('b').unsafePerformIO().$value)
// console.log(findParam('c').unsafePerformIO().$value)
// console.log(findParam('d').unsafePerformIO().$value)
// console.log(findParam('e').unsafePerformIO().$value)
