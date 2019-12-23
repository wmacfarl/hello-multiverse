import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapEditorComponent } from './map-editor/map-editor.component';
import { ScreenEditorComponent } from './screen-editor/screen-editor.component';
import { TileEditorComponent } from './tile-editor/tile-editor.component';
import { SpriteEditorComponent } from './sprite-editor/sprite-editor.component';
import { MusicEditorComponent } from './music-editor/music-editor.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { GameComponent } from './game/game.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapEditorComponent,
    ScreenEditorComponent,
    TileEditorComponent,
    SpriteEditorComponent,
    MusicEditorComponent,
    CodeEditorComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
