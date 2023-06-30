import * as THREE from 'three'

class Terrian {

    constructor (){

    }

    async getTerrainRgb(origin, radius, zoom, cb=undefined) {
        const _cbs = {onRgbDem: () => {}, onSatelliteMat: () => {}}; // to trigger rgb fetching
        const { rgbDem } = await this.getTerrain(origin, radius, zoom, _cbs);
        if (cb) { // Emulate the classic API
            cb(rgbDem); // Array<THREE.Mesh>
            return null;
        } else {
            const group = new THREE.Group();
            group.name = 'dem-rgb';
            group.add(...rgbDem);
            return group;s
        }
    }

}
