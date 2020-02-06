import db from '../db/database.js';
export class SpriteAnimation{

    constructor(id, name){
        this.id = id;
        this.name = name;
        this.spriteFrameIds = [];
    }

    save(){
        return db.spriteAnimations.put(this);
    }
}

