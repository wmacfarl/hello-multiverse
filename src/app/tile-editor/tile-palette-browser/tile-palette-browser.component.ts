import { Component, OnInit } from '@angular/core';
import { TilePalette } from './tile-palette';
import { TileEditorComponent } from '../tile-editor.component';

@Component({
  selector: 'app-tile-palette-browser',
  templateUrl: './tile-palette-browser.component.html',
  styleUrls: ['./tile-palette-browser.component.css']
})
export class TilePaletteBrowserComponent implements OnInit {

  tilePalettes: TilePalette[];
  constructor() { 
    this.tilePalettes = [
      new TilePalette("https://opengameart.org/sites/default/files/town_tiles.png", "tiny town"),
      new TilePalette("https://opengameart.org/sites/default/files/rpg%20indoor%20tileset%20expansion%201%20trans.png", "town indoors"),
      new TilePalette("https://opengameart.org/sites/default/files/foresttiles_0.gif", "forest tiles")
    ];
  }

  ngOnInit() {
  }

}
