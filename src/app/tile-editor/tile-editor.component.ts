import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';
import {PixelGrid} from '../shared/pixel-grid';
import { ColorPalette } from '../shared/color-palette';
import {PixelPainterComponent} from '../pixel-painter/pixel-painter.component'

@Component({
  selector: 'app-tile-editor',
  templateUrl: './tile-editor.component.html',
  styleUrls: ['./tile-editor.component.css']
})

export class TileEditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   
  }

  
}

