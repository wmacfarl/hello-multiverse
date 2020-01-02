import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';
import {PixelGrid} from '../shared/pixel-grid';
import { ColorPalette } from '../shared/color-palette';

@Component({
  selector: 'app-tile-editor',
  templateUrl: './tile-editor.component.html',
  styleUrls: ['./tile-editor.component.css']
})

export class TileEditorComponent implements OnInit {
  private p5: p5;
  pixelCanvasSize: number;
  pixelDrawSize: number;
  tileDimension: number;

  constructor() { }

  ngOnInit() {
    this.pixelCanvasSize = 480;
    this.tileDimension = 16;
    this.pixelDrawSize=this.pixelCanvasSize/this.tileDimension;
    this.createCanvas(); 
  }

  private createCanvas() {
    this.p5 = new p5(this.sketch);
  }

  private sketch = (p: any) => {
    

    p.setup = () => {
      p.selectedColor = [255,255,255];
      p.pMouseIsPressed = p.mouseIsPressed;
      p.pixelGrid = new PixelGrid(this.tileDimension,this.tileDimension);
      p.colorPalette = new ColorPalette(16);
      let canvas = p.createCanvas(this.pixelCanvasSize*1.5, this.pixelCanvasSize).parent('tile-editor-div');
    };
  
    p.draw = () => {
      p.background(128);
      p.fill(0);
      p.drawPixelGrid(p.pixelGrid)
      p.drawColorPalette(p.colorPalette);
      p.pMouseIsPressed = p.mouseIsPressed;
    };

    p.drawColorPalette = (colorPalette: ColorPalette) => {
      for(let i = 0; i <colorPalette.colorCount; i++ ){
        p.stroke(255);
        let x = this.pixelCanvasSize*1.5-this.pixelDrawSize*2;
        let y = this.pixelDrawSize*i;
        let w = this.pixelDrawSize*2;
        let h = this.pixelDrawSize;

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

    p.drawPixelGrid = (pixelGrid: PixelGrid)=>{
      for (let xIndex = 0; xIndex < pixelGrid.width; xIndex++){
        for (let yIndex = 0; yIndex < pixelGrid.height; yIndex++){
          let x = xIndex*this.pixelDrawSize;
          let y = yIndex*this.pixelDrawSize;
          let w = this.pixelDrawSize;
          let h = this.pixelDrawSize;

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
}

