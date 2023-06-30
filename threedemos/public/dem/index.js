function getImageData(img) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    const { width, height } = img;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);
    
    canvas = null;
    ctx = null;

    return imageData
}

function getLatData(data) {
    const size = Math.floor(Math.sqrt(data.length));
    
    const arr = []
    let startLng = 110, lngStep = 5/(size-1)
    let startLat = 30, latStep = -5/(size-1)
    for(let i = 0;i < size;i++){
        let arr2 = []
        for(let j = 0;j < size; j++) {
            let index = i + j * size;
            let x = startLng + lngStep * i;
            let y = startLat + latStep * j;

            arr2.push([x, y, data[index]]);
        }
        arr.push(arr2)
    }
    return arr;
}

function getLngData(data) {
    const size = Math.floor(Math.sqrt(data.length));
    const arr = []
    let startLng = 110, lngStep = 5/(size-1)
    let startLat = 30, latStep = -5/(size-1)
    /**
     * iiiiiiii
     * j
     * j
     * j
     */
    for(let i = 0;i < size;i++){
        let arr2 = []
       for(let j = 0;j < size; j++) {
            let index = i * size + j;
            let x = startLng + lngStep * j;
            let y = startLat + latStep * i;
            
            arr2.push([x, y, data[index]])
            
       }
    //    console.log(arr2)
       arr.push(arr2)
    }
    // console.log(arr)
    return arr;
}

function getR(data) {
    const arr = []
    for(let i = 0;i < data.length;i+= 4){
        arr.push(data[i])
    }
    return arr;
}