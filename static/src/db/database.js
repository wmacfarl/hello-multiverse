import Dexie from 'dexie';

const db = new Dexie('myDb');
db.version(1).stores({
    sprite_frames: '++id,name,size'
});
f
function readFile (file) {
    return new Promise(function (resolve) {
        let reader = new FileReader();
        reader.onload = e => resolve(new Uint8Array(e.target.result));
        reader.readAsArrayBuffer(file);
    });
}
export default db;