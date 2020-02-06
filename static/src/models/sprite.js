export class Sprite{
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.spriteAnimationIds = [];
    }

    save(){
        return db.sprites.put(this);
    }

}