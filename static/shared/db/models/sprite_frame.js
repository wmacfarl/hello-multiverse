import db from '../database.js';
export class SpriteFrame{
    constructor(id, name, imageFile){
        this.id = id;
        this.name = name;
        this.imageFile = imageFile;    
    }

    save(){
        return db.spriteFrames.put(this);
    }

}