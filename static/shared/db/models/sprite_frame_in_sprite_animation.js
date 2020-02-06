import db from '../db/database.js';
export class SpriteFrameInSpriteAnimation{

    constructor(id, spriteFrameId, spriteAnimationId, frameIndex){
        this.id = id;
        this.spriteFrameId = spriteFrameId;
        this.spriteAnimationId = spriteAnimationId;
        this.frameIndex = frameIndex;
    }

    save(){
        return db.sprite_frames_in_sprite_animations.put(this);
    }
}

