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
      p.pixelGrid = new PixelGrid(this.tileDimension,this.tileDimension);
      p.colorPalette = new ColorPalette(16);
      let canvas = p.createCanvas(this.pixelCanvasSize*1.5, this.pixelCanvasSize).parent('tile-editor-div');
    };
  
    p.draw = () => {
      p.background(128);
      p.fill(0);
      p.drawPixelGrid(p.pixelGrid)
      p.drawColorPalette(p.colorPalette);
    };

    p.drawColorPalette = (colorPalette: ColorPalette) => {
      for(let i = 0; i <colorPalette.colorCount; i++ ){
        p.stroke(255);
        p.fill(colorPalette.paletteColors[i][0],
                 colorPalette.paletteColors[i][1],
                 colorPalette.paletteColors[i][2]);
        p.rect(this.pixelCanvasSize*1.5-this.pixelDrawSize*2, this.pixelDrawSize*i, this.pixelDrawSize*2,this.pixelDrawSize);
      }
    }

    p.drawPixelGrid = (pixelGrid: PixelGrid)=>{
      for (let x = 0; x < pixelGrid.width; x++){
        for (let y = 0; y < pixelGrid.height; y++){
          p.stroke(255);
          p.fill(pixelGrid.pixels[x][y]);
          p.rect(x*this.pixelDrawSize, y*this.pixelDrawSize, this.pixelDrawSize, this.pixelDrawSize);
        }
      }
    }
  }
}

