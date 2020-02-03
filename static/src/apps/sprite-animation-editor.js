import {PixelGrid} from '../shared/pixel-grid.js';

let sketch = function(p){

    p.setSpriteEditor = (spriteEditor) =>{
        console.log("setting sprite editor");
        p.spriteEditor = spriteEditor;
    }

    p.setup = () => {
      p.selectedAnimation = -1;
      p.selectedFrame = -1;
      p.tileDimension = 16;
      p.canvasHeight = 480;
	    p.pixelDrawSize = p.canvasHeight/p.tileDimension;
      p.canvasWidth = p.pixelDrawSize*2*8;
      p.frameSize = p.pixelDrawSize*2;
      let canvas = p.createCanvas(p.canvasWidth, p.canvasHeight/2).parent('sprite-animation-editor-canvas');
    };
  
    p.draw = () => {
        p.background(255);
      
      if(p.mouseIsPressed){
        let topLeftColor = p.spriteEditor.pixelPainter.pixelGrid.pixels[0][0];
        console.log("color: " + topLeftColor);
      } 

      for (let i = 0; i < 4; i++){
          p.drawAnimation(i);
      }
    };

    p.drawAnimation = (animationIndex) =>{
        p.fill(128);
        p.stroke(0);
        for (let i = 0; i < 8; i++){
            p.drawAnimationFrame(animationIndex, i);
        }
    }

    p.drawAnimationFrame = (animationIndex, frameIndex) => {
        let x = p.frameSize*frameIndex;
        let y = p.frameSize*animationIndex;
        let w = p.frameSize;
        let h = p.frameSize;

        if (p.selectedFrame === frameIndex && p.selectedAnimation === animationIndex){
          p.fill(255,0,0);
        }else{
          p.fill(128);
        }

        p.rect(x, y, w, h);

        if (p.mouseIsPressed && p.pointInRectangle(p.mouseX, p.mouseY, x, y, w, h)){
          console.log("truse");
          p.selectedAnimation = animationIndex;
          p.selectedFrame = frameIndex;
        }
    }

    p.pointInRectangle = (pX, pY, x, y, w, h) => {
        return pX <= x + w && pX >= x &&
               pY <= y +h && pY >= y;
      }


    }
  

  export let spriteAnimationEditor = new p5(sketch);