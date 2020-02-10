import {PixelGrid} from './pixel-grid.js';
import { ColorPalette } from './color-palette.js';
import { SpriteFrame } from '../../shared/db/models/sprite_frame.js';
import db from '../../shared/db/database.js';

let sketch = function(p){
    p.setSpriteEditor = (spriteEditor) =>{
      p.spriteEditor = spriteEditor;
    }

    p.loadFromFile = () =>{
      let f = p.loadFileInput.elt.files[0];
      p5.File._load(f, p.readyImageForImport);
    }

    p.readyImageForImport = (f) =>{
      console.log(f);
      p.loadImage(f.data, p.imageLoaded);
    }

    p.imageLoaded = (img) =>{
      if (img.width == 16 && img.height == 16){
        p.loadImageOntoPixelCanvas(img);

      }else{
        alert("File must be a 16x16 image.");
      }

    }

    p.loadFromDb = () =>{
      p.loadModalGridContainer.html('');
      p.loadModalDiv.attribute('hidden', 'false');
      p.loadModalDiv.style('display', 'block');
      var collection =  db.sprite_frames.toCollection();
      var items = '';

      console.log('before loop');
      var itemIndex = 0;
      var rowLength = 6;
      var rowDiv;
      collection.each(function(frame) {

        if (itemIndex % rowLength === 0){
          rowDiv = document.createElement('div');
          rowDiv.setAttribute('class', 'row form-group');
          p.loadModalGridContainer.elt.appendChild(rowDiv);
        }

        var fig = document.createElement('figure');
        var figCaption = document.createElement('figcaption');
        figCaption.innerHTML = frame.name.slice(0,16);
        var image = new Image();
        image.src = URL.createObjectURL(frame.imageFile);
        image.width =96;
        image.height = 96;
        image.setAttribute('style', 'image-rendering: pixelated;');

        var colDiv = document.createElement('div');
        colDiv.setAttribute('class', 'col-md-2');
        var newText = document.createTextNode(frame.name);
        fig.appendChild(image);
        fig.appendChild(figCaption);

        colDiv.appendChild(fig);
        rowDiv.appendChild(colDiv);

        itemIndex++;
      });
      }

    p.savePixelCanvasToDb = () => {
      let img = p.createImage(16, 16);
      img.loadPixels();
      for (let i = 0; i < p.pixelGrid.pixels.length; i++) {
        for (let j = 0; j < p.pixelGrid.pixels[i].length; j++) {
          img.set(i, j, p.color(p.pixelGrid.pixels[i][j]));
        }
      }
      img.updatePixels();
      img.canvas.toBlob(savePngBlobToDB);
    }

    function savePngBlobToDB(pngBlob){
      if (p.nameInput.value() === ''){
        p.nameInput.value('untitled');
      }

      var newSpriteFrame = new SpriteFrame(p.nameInput.value(), pngBlob);
      console.log("nsf = " + newSpriteFrame);
      newSpriteFrame.save();
    }

    p.clearCanvas = () =>{
      for (let i = 0; i < p.pixelGrid.pixels.length; i++){
        for (let j = 0; j < p.pixelGrid.pixels[i].length; j++){
          p.pixelGrid.pixels[i][j] = p.color(255,255);
        }
      }
    }

    p.loadImageOntoPixelCanvas= (img) =>{
      for (let i = 0; i < img.width; i++){
        for (let j = 0; j < img.height; j++){
          let pixel = img.get(i,j);
          p.pixelGrid.pixels[i][j] = pixel;
        }
      }
    }

    p.setup = () => {
      p.loadFileInput = p.select("#painter-load-file-input");
      p.loadFileInput.changed(p.loadFromFile);

      p.loadButton = p.select('#painter-load-button');
      p.loadButton.mousePressed(p.loadFromDb);

      p.saveButton = p.select('#painter-save-button');
      p.saveButton.mousePressed(p.savePixelCanvasToDb);
      
      p.clearButton = p.select('#painter-clear-button');
      p.clearButton.mousePressed(p.clearCanvas);

      p.nameInput = p.select('#painter-name-input');
      p.loadModalDiv = p.select('#load-files-modal');
      
      p.closeLoadModalButton = p.select('#close-load-modal-button');
      p.closeLoadModalButton.mousePressed(p.closeModal);

      p.loadModalGridContainer = p.select('#load-modal-grid-container');

	    p.pixelCanvasSize = 480;
	    p.tileDimension = 16;
	    p.pixelDrawSize = p.pixelCanvasSize/p.tileDimension;
      p.selectedColor = [255,255,255];
      p.pMouseIsPressed = p.mouseIsPressed;
      p.pixelGrid = new PixelGrid(p.tileDimension,p.tileDimension);
      p.colorPalette = new ColorPalette(16);
      let canvas = p.createCanvas(p.pixelCanvasSize+p.pixelDrawSize*2, p.pixelCanvasSize).parent('pixel-painter-canvas');
    };

    p.closeModal = () => {
      p.loadModalDiv.attribute('hidden', 'true');
      p.loadModalDiv.style('display', 'none');
    }

    p.importFile = () => {
      console.log(p.loadFileInput.value())
    }

    p.draw = () => {
      p.background(128);
      p.fill(0);
      p.drawPixelGrid(p.pixelGrid)
      p.drawColorPalette(p.colorPalette);
      p.pMouseIsPressed = p.mouseIsPressed;
    };

    p.drawColorPalette = (colorPalette) => {
      for(let i = 0; i <colorPalette.colorCount; i++ ){
        p.stroke(255);
        let x = p.pixelCanvasSize;
        let y = p.pixelDrawSize*i;
        let w = p.pixelDrawSize*2;
        let h = p.pixelDrawSize;

        p.fill(colorPalette.paletteColors[i][0],
                 colorPalette.paletteColors[i][1],
                 colorPalette.paletteColors[i][2]);
        p.rect(x, y,w ,h);
        if (p.loadModalDiv.attribute('hidden') === 'true'){
        if(p.mouseX >= x && p.mouseY >= y 
          && p.mouseX < x+w && p.mouseY < y+h){
         if(p.mouseIsPressed && !p.pMouseIsPressed){
          p.selectedColor = colorPalette.paletteColors[i];
         }
        }
       }
      }
    }

    p.drawPixelGrid = (pixelGrid)=>{
      for (let xIndex = 0; xIndex < pixelGrid.width; xIndex++){
        for (let yIndex = 0; yIndex < pixelGrid.height; yIndex++){
          let x = xIndex*p.pixelDrawSize;
          let y = yIndex*p.pixelDrawSize;
          let w = p.pixelDrawSize;
          let h = p.pixelDrawSize;
         
          if (p.loadModalDiv.attribute('hidden') === 'true'){
          if(p.mouseX >= x && p.mouseY >= y 
            && p.mouseX < x+w && p.mouseY < y+h &&
            p.mouseIsPressed && !p.pMouseIsPressed){              
            pixelGrid.pixels[xIndex][yIndex] = p.color(p.selectedColor[0], p.selectedColor[1], p.selectedColor[2]);
           }
          }
          
          p.stroke(255);
          p.fill(pixelGrid.pixels[xIndex][yIndex]);
          p.rect(x,y,w,h);
        }
      }
    }

  }

  export let pixelPainter = new p5(sketch);