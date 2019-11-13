

/**
 * LeetCode 两数之和 优化查询过程即可
 * 示例:

    给定 nums = [2, 7, 11, 15], target = 9

    因为 nums[0] + nums[1] = 2 + 7 = 9
    所以返回 [0, 1]
 */

let arr = [1, 2, 3, 6]  // 给出的数组
let sum = 5             // 目标值

// 1、暴力破解  O(n*n)

for(var i = 0;i < arr.length;i++){
    for(var j = i + 1;j < arr.length;j++){
        if(arr[i] + arr[j] == sum){
            console.log([i,j])
            break
        }
    }
}

// 2、哈希表优化查询 O(n)

let map_obj = {}
arr.forEach((value,index)=>map_obj[value] = index)
for(var i = 0;i < arr.length;i++){
    let num = map_obj[sum - arr[i]]
    if(num && num !== i){
        console.log([i, num])
        break
    }
}

// 3、es6 map O(n)

let map = new Map()
arr.forEach((value,index)=>map.set(value,index))
for(var i = 0;i < arr.length;i++){
    let num2 = map.get(sum-arr[i])
    if(num2 && num2 !== i){
        console.log([i,num2])
        break
    }
}
