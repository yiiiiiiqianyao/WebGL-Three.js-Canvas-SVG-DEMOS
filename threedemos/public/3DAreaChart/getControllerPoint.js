// 获取一些列点的三阶贝塞尔曲线控制点的方法
var points = [
    {x: 0, y: 2},
    {x: 1, y: 10},
    {x: 3, y: 9},
    {x: 5, y: 4},
    {x: 8, y: 7},
    {x: 10, y: 8},
    {x: 13, y: 7},
    {x: 15, y: 2},
    {x: 16, y: 0},
    {x: 18, y: 1},
    {x: 20, y: 0}
]
console.log(points.length)
let controlPoints = []
for(let i = 1;i < points.length;i++) {
    let { x: prePreX,   y: prePreY } = (i-2>0)?points[i-2] : points[0]
    let { x: preX,      y: preY } = (i-1>=0)?points[i-1] : points[0]
    let { x: currentX,  y: currentY } = points[i]
    let { x: nextX,     y: nextY } = (i+1<points.length-1)?points[i+1] : points[points.length-1]
    
    let controlX1= preX + 0.25 * (currentX - prePreX)
    let controlY1= preY + 0.25 * (currentY - prePreY)
    let controlX2 = currentX -0.25 * (nextX - preX)
    let controlY2 = currentY - 0.25 * (nextY - preY)

    controlPoints.push({
        v1: [controlX1, controlY1],
        v2: [controlX2, controlY2]
    })
}
console.log(controlPoints, controlPoints.length)