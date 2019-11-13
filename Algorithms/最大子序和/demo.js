/**
 * @param {number[]} nums
 * @return {number}
 */
let arr = []
var maxSubArray = function(nums) {
    // let ans = nums[0]
    // let sum = 0
    // for(const num of nums) {
    //     if(sum > 0) {
    //         sum += num
    //         arr.push(num)
    //     } else {    // first 
    //         sum = num
    //         arr = [num]
    //     }
    //     console.log(sum)
    //     console.log(arr)
    //     ans = Math.max(ans, sum)
    //     console.log(ans)
    //     console.log('---------')
    // }
    // return ans;
    var sum = 0
    var ans = nums[0]
    for(var num of nums){
        if(sum > 0){
            sum += num
        }else {
            sum = num
        }
        ans = Math.max(ans, sum)
    }
    return ans
}
var ans = maxSubArray([-2,1,-3,4,-1,2,1,-5,4]) // [-2,1,-3,4,-1,2,1,-5,4]
console.log('****')
console.log(ans)
// console.log(arr)