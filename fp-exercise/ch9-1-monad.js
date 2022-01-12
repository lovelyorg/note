import { chain, IO, trace } from './support/index.js'
import { compose, map } from 'ramda'

//  readFile :: String -> IO String
var readFile = function (filename) {
  return new IO(function () {
    return 'hi'
  })
}

//  print :: String -> IO String
var print = function (x) {
  return new IO(function () {
    console.log('x:' + x)
    return x
  })
}

// Example
// ===========================
//  cat :: IO (IO String)
var cat = compose(map(print), readFile)

compose(
  trace('trace2'),
  map(map(console.log)),
  trace('trace'),
  cat
)('.git/config')
  .unsafePerformIO()
  .unsafePerformIO()
// IO(IO("[core]\nrepositoryformatversion = 0\n"))

var cat2 = compose(chain(print), readFile)
cat2('.git/config').unsafePerformIO()
