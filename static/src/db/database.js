import Dexie from 'dexie';

const db = new Dexie('myDb');
db.version(1).stores({
    sprite_frames: '++id,name,size'
});

export default db;