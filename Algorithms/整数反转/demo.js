/**
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

    示例 1:

    输入: 123
    输出: 321
     示例 2:

    输入: -123
    输出: -321
    示例 3:

    输入: 120
    输出: 21

 */

 /**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    var index = 1,j
    if(x < 0) index = -1
    var x_str = x.toString()
    var len = x_str.length,new_str = ''
    for(var i = len-1;i >= 0; i--){
        new_str += x_str[i]
    }
    for(j = 0;j < len;j++){ 
        if(new_str[j] !== '0')break
    }
    if(j == len)return 0
    new_str = new_str.substring(j)
    len = new_str.length
    var answer = index * JSON.parse(new_str[len-1]=='-'?new_str=new_str.substring( 0, len - 1): new_str)
    if(answer < Math.pow(-2,31) || answer > Math.pow(2,31) - 1){
        return 0
    }else{
        return answer
    }
};
var an = reverse(-10)
console.log(an)