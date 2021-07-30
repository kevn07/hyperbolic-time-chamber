// const array1 = [1, 2, 3, 4];
// function test(a, k) {
//     return a.reduce(
//         (acc, curr, _, arr) =>
//         {
//             acc.total += curr
//             if (acc.total <= k) {
//                 acc.maxLength += 1
//             } else {
//                 acc.total -= arr[start]
//                 start += 1
//             }
//             return acc
//         },
//         {
//             start: 0,
//             total: 0,
//             maxLength: 0
//         })
// }


// const maxLength = (a, k) => {
    // const result = a.reduce((acc, curr, _, arr) => {
    //     return acc.total + curr <= k ? {
    //         start: acc.start,
    //         total: acc.total + curr,
    //         windowSize: acc.windowSize + 1
    //     }
    //     : {
    //         windowSize: acc.windowSize,
    //         total: acc.total - arr[acc.start] + curr,
    //         start: acc.start + 1
    //     }
    // },
    // {
    //     total: 0,
    //     start: 0,
    //     windowSize: 0
    // })
    // return result.windowSize
// }

// console.log(maxLength([0, 0, 1, 2, 3, 1, 8], 2))

// a.reduce()


// S = "acb"


// let indexBiggest = 0
// let array = S.split('')
// array.forEach(a =>
//     a > S[indexBiggest] ? indexBiggest = S.indexOf(a) : indexBiggest = indexBiggest
// )

// console.log(array.splice(indexBiggest,1))
// console.log(array.join(''))
// // for (let i=0; i <= S.length; i++) {

// // }


// console.log(indexBiggest)

let temp = 3/2
temp = temp.toFixed(0)
// console.log(temp)
// console.log(2**3)

function diff(n, mid)
    {
        if (n > (mid*mid*mid))
            return (n-(mid*mid*mid));
        else
            return ((mid*mid*mid) - n);
    }

function cubed(n) {
    // Write your code here
    // let loop = true
    // let start = 0
    // let end = n
    
    // while (loop) {
    //     let mid = (start + end)/2
    //     console.log(mid)
    //     if (diff(n, mid) == 0) {
    //         return true
    //     }
    //     if (mid == end || mid == start) {
    //         return false
    //     }
    //     if (mid**3 > n){
    //         end = mid;
    //     } else {
    //         start = mid;
    //     }
    // }
    let cubicRootVal = n ** (1/3)
    cubicRootVal = cubicRootVal.toFixed(0)
    if (cubicRootVal**3 == n) {
        return true
    } else {
        return false
    }
}

console.log(cubed(125))