function ang2rad(ang){
    // 角度变弧度
    return (ang * Math.PI) / 180;
};

function createRandomMaterial() {
    return new THREE.MeshPhongMaterial({color: Math.floor(Math.random()*(1<<24))})
}