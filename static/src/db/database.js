import Dexie from 'dexie';
import { SpriteFrame } from '../models/sprite_frame.js';
import { Sprite } from '../models/sprite.js';
import { SpriteAnimation } from '../models/sprite_animation.js';

const db = new Dexie('myDb');
db.version(1).stores({
    sprites: '++id, name',
    sprite_frames: '++id,name,size',
    sprite_animations: '++id, type',
    sprite_animations_to_sprite_frames: '++id, sprite_animation_id, sprite_frame_id',
    sprite_animations_to_sprites: '++id, sprite_animation_id, sprite_id'
});

export default db;
