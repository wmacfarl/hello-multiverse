import db from '../db/database.js';
export class SpriteAnimationInSprite{

    constructor(id, spriteId, spriteAnimationId, animationType){
        this.id = id;
        this.spriteId = spriteId;
        this.spriteAnimationId = spriteAnimationId;
        this.animationType = animationType;
    }

    save(){
        return db.sprite_animations_in_sprite.put(this);
    }
}

