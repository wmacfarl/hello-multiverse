import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';
import {PixelGrid} from '../shared/pixel-grid';

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
  pixelGrid:PixelGrid;

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
      let canvas = p.createCanvas(this.pixelCanvasSize, this.pixelCanvasSize).parent('tile-editor-div');
    };
  
    p.draw = () => {
      p.background(128);
      p.fill(0);
      p.drawPixelGrid(p.pixelGrid)
    };

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

