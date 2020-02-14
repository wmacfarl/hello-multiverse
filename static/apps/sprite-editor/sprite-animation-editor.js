import { PixelGrid } from './pixel-grid.js';
import db from '../../shared/db/database.js';

let sketch = function (p) {

  p.setSpriteEditor = (spriteEditor) => {
    p.spriteEditor = spriteEditor;

  }

  p.setup = () => {
    p.timeAtLastPreviewFrame = 0;
    p.loadModalDiv = p.select('#load-files-modal');
    p.selectedAnimation = -1;
    p.selectedFrame = -1;
    p.tileDimension = 16;
    p.canvasHeight = 480;
    p.pixelDrawSize = p.canvasHeight / p.tileDimension;
    p.canvasWidth = p.pixelDrawSize * 2 * 10;
    p.frameSize = p.pixelDrawSize * 2;
    let canvas = p.createCanvas(p.canvasWidth, p.canvasHeight / 2).parent('sprite-animation-editor-canvas');
    p.previewFrameIndex = -1;
    p.previewAnimationIndex = -1;
    p.frameImageArray = [];
    for (let i = 0; i < 4; i++) {
      p.frameImageArray[i] = [];
    }
    p.playingPreview = false;

    p.setButton = p.select("#animation-set-button");
    p.setButton.mousePressed(p.setAnimationFrame);
    p.editButton = p.select("#animation-edit-button");
    p.editButton.mousePressed(p.editSelectedImage);
    p.clearButton = p.select("#animation-clear-button");
    p.clearButton.mousePressed(p.clearSelectedImage);
    p.playPauseButton = p.select("#animation-play-pause-button");
    p.playPauseButton.mousePressed(p.playPausePreview);
    p.saveSpriteButton = p.select("#save-sprite-button");
    p.saveSpriteButton.mousePressed(p.saveSpriteToDb);
    p.loadSpriteButton = p.select("#load-sprite-button");
    p.loadSpriteButton.mousePressed(p.loadSpriteFromDb);

    p.noSmooth();
  };

  p.saveSpriteToDb = () => {
    alert("save");
  }

  p.loadSpriteFromDb = () => {
    alert("load");    
  }


  p.playPausePreview = () => {
    p.playingPreview = !p.playingPreview;

    if(p.playingPreview){
      if (p.selectedFrame >= 0 && p.selectedAnimation >= 0){
        p.previewFrameIndex = 0;
        p.previewAnimationIndex = p.selectedAnimation;
        p.timeAtLastPreviewFrame = p.millis();
      }
    }else {
      p.previewFrameIndex = -1;
    }
  }

  p.clearSelectedImage = () => {
    p.frameImageArray[p.selectedAnimation][p.selectedFrame] = null;
  }

  p.editSelectedImage = () => {
    let img = p.getSelectedImage();
    if (img){
      p.spriteEditor.pixelPainter.loadImageOntoPixelCanvas(img);
    }
  }

  p.getSelectedImage = () => {
    if (p.selectedFrame >= 0 && p.selectedAnimation >= 0){
      return p.frameImageArray[p.selectedAnimation][p.selectedFrame];
    }else{
      return false;
    }
  }

  p.setAnimationFrame = () => {
    if (p.selectedAnimation >= 0 && p.selectedFrame >= 0){
    let pixelData = p.spriteEditor.pixelPainter.pixelGrid.pixels;
    let img = p.imageFromPixelArray(pixelData);
    p.frameImageArray[p.selectedAnimation][p.selectedFrame] = img;
  }
}

  p.imageFromPixelArray = (pixelData) => {
    let img = p.createImage(16, 16);
    img.loadPixels();
    for (let i = 0; i < pixelData.length; i++) {
      for (let j = 0; j < pixelData[i].length; j++) {
        img.set(i, j, p.color(pixelData[i][j]));
      }
    }
    img.updatePixels();
    return img;
  }

  p.draw = () => {
    p.background(255);

    for (let i = 0; i < 4; i++) {
      p.drawAnimation(i);
    }

    p.drawAnimationPreview();
  };

  p.getCurrentPreviewFrame = () => {
    if (p.previewFrameIndex >=0){
      let timeDelta = p.millis() - p.timeAtLastPreviewFrame;

      if (timeDelta > 160){
        p.timeAtLastPreviewFrame = p.millis();
        p.previewFrameIndex++;
      }

      let img = p.frameImageArray[p.previewAnimationIndex][p.previewFrameIndex];
      if (img === undefined){
        p.previewFrameIndex = 0;
        img = p.frameImageArray[p.previewAnimationIndex][p.previewFrameIndex];
      }
      
      return img;
    } else {
      return false;
    }
  }

  p.drawAnimationPreview = () => {
    p.fill(128);
    p.stroke(0);
    p.rect(p.width-64,0, 64,64);
    if (p.playingPreview){
      let img = p.getCurrentPreviewFrame();
      if (img){
        p.image(img, p.width-64,0, 64,64);
      }
    } else {
      let img = p.getSelectedImage();
      if (img){
        p.image(img, p.width-64,0, 64,64);
      }
    }
  }

  p.drawAnimation = (animationIndex) => {
    p.fill(128);
    p.stroke(0);
    for (let i = 0; i < 8; i++) {
      p.drawAnimationFrame(animationIndex, i);
    }
  }

  p.drawAnimationFrame = (animationIndex, frameIndex) => {
    let x = p.frameSize * frameIndex;
    let y = p.frameSize * animationIndex;
    let w = p.frameSize;
    let h = p.frameSize;

    if (p.selectedFrame === frameIndex && p.selectedAnimation === animationIndex) {
      p.fill(0, 200, 0, 80);
      p.rect(x, y, w, h);
    }

    if (p.frameImageArray[animationIndex][frameIndex]) {
      p.image(p.frameImageArray[animationIndex][frameIndex], x, y, w, h);
    } else {

      p.fill(128, 80);
      p.rect(x, y, w, h);
    }
    if (p.loadModalDiv.attribute('hidden') === 'true'){
    if (p.mouseIsPressed && p.pointInRectangle(p.mouseX, p.mouseY, x, y, w, h)) {
      p.selectedAnimation = animationIndex;
      p.selectedFrame = frameIndex;
    }
  }
  }

  p.pointInRectangle = (pX, pY, x, y, w, h) => {
    return pX <= x + w && pX >= x &&
      pY <= y + h && pY >= y;
  }
}

export let spriteAnimationEditor = new p5(sketch);