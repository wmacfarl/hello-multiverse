import { PixelGrid } from './pixel-grid.js';
import db from '../../shared/db/database.js';

let sketch = function (p) {

  p.setSpriteEditor = (spriteEditor) => {
    p.spriteEditor = spriteEditor;
  }

  p.setup = () => {
    p.loadModalDiv = p.select('#load-files-modal');
    p.selectedAnimation = -1;
    p.selectedFrame = -1;
    p.tileDimension = 16;
    p.canvasHeight = 480;
    p.pixelDrawSize = p.canvasHeight / p.tileDimension;
    p.canvasWidth = p.pixelDrawSize * 2 * 8;
    p.frameSize = p.pixelDrawSize * 2;
    let canvas = p.createCanvas(p.canvasWidth, p.canvasHeight / 2).parent('sprite-animation-editor-canvas');

    p.frameImageArray = [];
    for (let i = 0; i < 4; i++) {
      p.frameImageArray[i] = [];
    }

    p.setButton = p.select("#animation-set-button");
    p.setButton.mousePressed(p.setAnimationFrame);
  };

  p.setAnimationFrame = () => {

    let pixelData = p.spriteEditor.pixelPainter.pixelGrid.pixels;
    let img = p.imageFromPixelArray(pixelData);
    p.frameImageArray[p.selectedAnimation][p.selectedFrame] = img;
  }

  p.imageFromPixelArray = (pixelData) => {
    let img = p.createImage(16, 16);
    img.loadPixels();
    for (let i = 0; i < pixelData.length; i++) {
      for (let j = 0; j < pixelData[i].length; j++) {
        console.log(pixelData[i][j]);
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
  };

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