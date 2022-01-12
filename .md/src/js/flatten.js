//// 实现一个 flatten 函数，实现如下的转换功能
/* const obj = {
a: 1,
b: [1, 2, { c: true }],
c: { e: 2, f: 3 },
g: null,
};
// 转换为
let objRes = {
a: 1,
"b[0]": 1,
"b[1]": 2,
"b[2].c": true,
"c.e": 2,
"c.f": 3,
g: null,
}; */

let obj = {
    a: 1,
    b: [1, 2, { c: true, d: [0, 1, { xx: { yy: ['a', [6, 7, 8], 'c'] } }] }],
    c: { e: 2, f: 3, d: { a: 'cda' } },
    g: null,
    f: () => 1,
    x: [[[0, { 1: 1 }]]]
}

const isArray = x => x && Object.getPrototypeOf(x) == Object.getPrototypeOf([])
const isObject = x => x && Object.getPrototypeOf(x) == Object.getPrototypeOf({})
const getJoinChar = x => isObject(x) ? '.' : ''
const flatten = (data, prefix = '') => {
    if (isObject(data)) {
        let rst = {}
        Object.keys(data).forEach(m => {
            rst = { ...rst, ...flatten(data[m], `${prefix}${m}${getJoinChar(data[m])}`) }
        })
        return rst
    }
    if (isArray(data)) {
        let rst = {}
        data.forEach((x, i) => {
            rst = { ...rst, ...flatten(x, `${prefix}[${i}]${getJoinChar(x)}`) }
        })
        return rst
    }
    return { [prefix]: data }
}
console.log(flatten(obj))