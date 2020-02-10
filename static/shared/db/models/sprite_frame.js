import db from '../database.js';
export class SpriteFrame{
    constructor(name, imageFile){
        this.name = name;
        this.imageFile = imageFile;    
    }

    save(){
        return db.sprite_frames.put(this);
    }

}