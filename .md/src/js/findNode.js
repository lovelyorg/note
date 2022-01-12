// 查找符合的项目, 查找范围包括child

const data = [
    { code: 'a', name: 'aa' },
    {
        code: 'b', name: 'bb', child: [
            { code: 'c', name: 'cc' },
            { code: 'd', name: 'dd' },
        ]
    },
]

const findNode = (label, value, child, data, prop) => {
    if (!data) return null
    const rst = data.find(x => x[value] == prop)
    if (rst) return rst

    for (const item of data.filter(x => x[child])) {
        const x = findNode(label, value, child, item[child], prop)
        if (x) return x
    }
}

console.log(findNode('name', 'code', 'child', data, 'c'))
const a1 = findNode('name', 'code', 'child', data, 'a')
data[0].name = 123
const a2 = findNode('name', 'code', 'child', data, 'a')
console.log({ a1, a2 })
