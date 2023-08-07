

// terrain      地形
// Biome        生物群落
// elevation    海拔

import { EventSystem } from "./emmit.js";

// moisture     潮湿、水汽
export const ChunkRange = 25;

export class ChunkManager extends EventSystem {
    chunkCache = new Map();
    simplex
    constructor(simplex) {
        super();
        this.simplex = simplex;
        this.bindEvent();
    }

    bindEvent() {

    }

    updateChunk(chunkId) {
        // const id = this.initChunkID(x, z);
        if(this.chunkCache.has(chunkId)) {
            return;
        }
        this.chunkCache.set(chunkId, {});
        const origin = this.parseChunkId(chunkId);

        for(let x = origin[0]; x < origin[0] + ChunkRange;x++) {
            for(let z = origin[1]; z < origin[1] + ChunkRange;z++) {
                const elevation = generateElevation(this.simplex, x, z);
                this.emit('ADD_BLOCK', {
                    x, y: elevation, z
                });
            }
        }
    }

    addBlock() {

    }

    initChunkID(x, z) {
        const chunkX = Math.floor(x / ChunkRange);
        const chunkZ = Math.floor(z / ChunkRange);
        return `${chunkX}.${chunkZ}`
    }
    
    parseChunkId(chunkId) {
        const [x, z] = chunkId.split('.');
        const px = x * ChunkRange;
        const pz = z * ChunkRange;
        return [px, pz]
    }

    getAroundChunkIds(chunkId) {
        const [ cx, cz ] = chunkId.split('.');
        return [
            `${+cx - 1}.${+cz - 1}`,
            `${+cx}.${+cz - 1}`,
            `${+cx + 1}.${+cz + 1}`,

            `${+cx - 1}.${+cz}`,
            `${+cx + 1}.${+cz}`,

            `${+cx - 1}.${+cz + 1}`,
            `${+cx}.${+cz + 1}`,
            `${+cx + 1}.${+cz + 1}`,
        ]
    }
}

/**
 * 
 * @param {*} simplex 
 * @param {*} x 
 * @param {*} z 
 * @param {*} min 最低海拔
 * @param {*} max 最高海拔
 * @returns 
 */
export function generateElevation(simplex, x, z, min = -128, max = 128) {
    const E1d = 8;
    const E1 = simplex.noise2D(x / E1d, z / E1d);

    const E2d = 20;
    const E2 = simplex.noise2D(x / E2d, z / E2d);

    const E3d = 80;
    const E3 = simplex.noise2D(x / E3d, z / E3d);

    const E = (E1 * 0.2 + E2 * 0.3 + E3 * 0.5) * 12;
    
    return Math.floor(E);
}