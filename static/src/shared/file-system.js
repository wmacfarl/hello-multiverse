function readFile (file) {
    return new Promise(function (resolve) {
        let reader = new FileReader();
        reader.onload = e => resolve(new Uint8Array(e.target.result));
        reader.readAsArrayBuffer(file);
    });
}

function addFile (file) {
    readFile(file)
        .then(data => Database.images.add({ name: file.name, 
			size: file.size, 
			data}));
}

function addFile (file) {
    return readFile(file)
        .then(arrayBuffer => Database.images.add(new Image(arrayBuffer)));
}

async function saveImageToDB(imagePath, url, name) {
    const res = await fetch(imagePath);
    const blob = await res.blob();
    // Store the binary data in indexedDB:
    await db.images.put({
        image: blob,
    });
}