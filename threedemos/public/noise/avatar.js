

import { EventSystem } from './emmit.js';

export class Avatar extends EventSystem {
    position = new THREE.Vector3();
    currentChunkID;
    chunkManager;
    constructor(originPosition, chunkManager) {
        super();
        this.position.copy(originPosition);
        this.chunkManager = chunkManager;
        this.currentChunkID = chunkManager.initChunkID(originPosition.x, originPosition.z);
        console.log('this.currentChunkID', this.currentChunkID)
        
    }

    update(newPos) {
        if(!newPos?.isVector3) return;
        if(!this.position.equals(newPos)) {
            this.position.copy(newPos);
            this.emit('AVATAR_MOVE', {
                x: newPos.x,
                z: newPos.z
            })

            const chunkId = this.chunkManager.initChunkID(newPos.x, newPos.z);
            if(this.currentChunkID !== chunkId) {
                this.currentChunkID = chunkId;
                
                this.chunkManager.updateChunk(chunkId);
                const chunkIds = this.chunkManager.getAroundChunkIds(chunkId);
                chunkIds.forEach(id => {
                    this.chunkManager.updateChunk(id);
                });
            }
        }
    }
}