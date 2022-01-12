import _ from 'ramda'
import { strict as assert } from 'assert'

// 练习 1
//==============
// 通过局部调用（partial apply）移除所有参数

var words = _.split(' ')

assert.deepEqual(words('wang da'), ['wang', 'da'])
assert.deepEqual(words('Jingle bells Batman smells'), ['Jingle', 'bells', 'Batman', 'smells'])

// 练习 1a
//==============
// 使用 `map` 创建一个新的 `words` 函数，使之能够操作字符串数组

var sentences = _.map(words)

assert.deepEqual(sentences(['wang da', 'Jingle bells']), [
  ['wang', 'da'],
  ['Jingle', 'bells'],
])

// 练习 2
//==============
// 通过局部调用（partial apply）移除所有参数

var filterQs = function (xs) {
  return filter(function (x) {
    /// match ???
    return match(/q/i, x)
  }, xs)
}
var filterQs = _.filter(_.test(/q/i))

assert.deepEqual(filterQs(['a', 'b', 'qq', 'aQ']), ['qq', 'aQ'])

// 练习 3
//==============
// 使用帮助函数 `_keepHighest` 重构 `max` 使之成为 curry 函数

// 无须改动:
var _keepHighest = function (x, y) {
  return x >= y ? x : y
}

// 重构这段代码:
var max = function (xs) {
  return reduce(
    function (acc, x) {
      return _keepHighest(acc, x)
    },
    -Infinity,
    xs
  )
}

var max = _.reduce(_keepHighest, -Infinity)

assert.deepEqual(max()([1, 2, 30, 5]), 30)

// 彩蛋 1:
// ============
// 包裹数组的 `slice` 函数使之成为 curry 函数
// //[1,2,3].slice(0, 2)
var slice = _.curry((start, end, ary) => ary.slice(start, end))

assert.deepEqual(slice(0)(3)([1, 2, 3, 4]), [1, 2, 3])

// 彩蛋 2:
// ============
// 借助 `slice` 定义一个 `take` curry 函数，该函数调用后可以取出字符串的前 n 个字符。
var take = slice(0)

assert.deepEqual(take(2)('abc'), 'ab')
