import {PixelGrid} from './pixel-grid.js';
import { ColorPalette } from './color-palette.js';

let sketch = function(p){

    p.setSpriteEditor = (spriteEditor) =>{
      p.spriteEditor = spriteEditor;
    }

    p.loadPainterImage = (event) =>{
      let f = p.loadFileInput.elt.files[0];
      p5.File._load(f, p.readyImageForImport);
    }

    p.readyImageForImport = (f) =>{
      console.log(f);
      p.img = p.createImg(f.data);
    }

    p.setup = () => {

      p.importButton = p.select("#painter-import-button");
      p.loadFileInput = p.select("#painter-load-file-input");
      p.loadFileInput.changed(p.loadPainterImage);
      p.importButton.mousePressed(p.importFile);

	  p.pixelCanvasSize = 480;
	  p.tileDimension = 16;
	  p.pixelDrawSize = p.pixelCanvasSize/p.tileDimension;
      p.selectedColor = [255,255,255];
      p.pMouseIsPressed = p.mouseIsPressed;
      p.pixelGrid = new PixelGrid(p.tileDimension,p.tileDimension);
      p.colorPalette = new ColorPalette(16);
      let canvas = p.createCanvas(p.pixelCanvasSize+p.pixelDrawSize*2, p.pixelCanvasSize).parent('pixel-painter-canvas');
    };

    p.importFile = () => {
      console.log(p.loadFileInput.value())
    }

    p.draw = () => {

      p.background(128);
      p.fill(0);
      p.drawPixelGrid(p.pixelGrid)
      p.drawColorPalette(p.colorPalette);
      p.pMouseIsPressed = p.mouseIsPressed;
      if (p.img){
        console.log("here");
        p.image(p.img, 0, 0, p.width, p.height);
      }
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

        if(p.mouseX >= x && p.mouseY >= y 
          && p.mouseX < x+w && p.mouseY < y+h){
         if(p.mouseIsPressed && !p.pMouseIsPressed){
          p.selectedColor = colorPalette.paletteColors[i];
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

          if(p.mouseX >= x && p.mouseY >= y 
            && p.mouseX < x+w && p.mouseY < y+h &&
            p.mouseIsPressed && !p.pMouseIsPressed){
            pixelGrid.pixels[xIndex][yIndex] = p.color(p.selectedColor[0], p.selectedColor[1], p.selectedColor[2]);
           }
          
          p.stroke(255);
          p.fill(pixelGrid.pixels[xIndex][yIndex]);
          p.rect(x,y,w,h);
        }
      }
    }

  }

  export let pixelPainter = new p5(sketch);