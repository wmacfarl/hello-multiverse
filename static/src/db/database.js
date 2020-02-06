import Dexie from 'dexie';
import { SpriteFrame } from '../models/sprite_frame.js';
import { Sprite } from '../models/sprite.js';
import { SpriteAnimation } from '../models/sprite_animation.js';

const db = new Dexie('myDb');
db.version(1).stores({
    sprites: '++id, name',
    sprite_frames: '++id,name,size',
    sprite_animations: '++id, type',
    sprite_frames_in_sprite_animations: '++id, sprite_frame_id, sprite_animation_id',
    sprite_animations_in_sprites: '++id, sprite_animation_id, sprite_id'
});

db.sprites.mapToClass(Sprite);
db.sprite_frames.mapToClass(SpriteFrame);
db.sprite_animations.mapToClass(SpriteAnimation);

export default db;
