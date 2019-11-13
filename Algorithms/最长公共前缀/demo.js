/**
 * 编写一个函数来查找字符串数组中的最长公共前缀
 * 如果不存在公共前缀，返回空字符串 ""

    输入: ["flower","flow","flight"]
    输出: "fl"
    示例 2:

    输入: ["dog","racecar","car"]
    输出: ""
    解释: 输入不存在公共前缀。

 */

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length===0 ||strs[0].length===0)return ""
    var s0 = strs[0]
    for(var i = 0;i < s0.length;i++){
        for(var j = 0;j < strs.length;j++){
            if(s0[i] !== strs[j][i])return s0.substring(0,i)
        }
    }
    return s0.substring(0,i)
};
var an = longestCommonPrefix(['c','c'])
console.log(an)