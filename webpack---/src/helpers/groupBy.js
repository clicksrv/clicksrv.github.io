const groupBy = (array, iteratee) =>
    array.reduce((memo, element) => {
        const key = typeof iteratee === 'function' ? iteratee(element) : element[iteratee]

        memo[key] = memo[key] || []
        memo[key].push(element)

        return memo
    }, {})

export default groupBy