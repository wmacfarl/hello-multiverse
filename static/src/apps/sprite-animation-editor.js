import {PixelGrid} from '../shared/pixel-grid.js';

let sketch = function(p){

    p.setSpriteEditor = (spriteEditor) =>{
        console.log("setting sprite editor");
        p.spriteEditor = spriteEditor;

    }

    p.setup = () => {
      p.tileDimension = 16;
      p.canvasHeight = 480;
	  p.pixelDrawSize = p.canvasHeight/p.tileDimension;
      p.canvasWidth = p.pixelDrawSize*2*8;
      p.frameSize = p.pixelDrawSize*2;
      let canvas = p.createCanvas(p.canvasWidth, p.canvasHeight).parent('sprite-animation-editor-canvas');
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
        p.rect(p.frameSize*frameIndex, p.frameSize*animationIndex, p.frameSize, p.frameSize);
    }

    
  }

  export let spriteAnimationEditor = new p5(sketch);