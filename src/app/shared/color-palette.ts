import * as p5 from 'p5';

export class ColorPalette{
    paletteColors: number[][];
    colorCount:number;

    constructor(colorCount: number){
        this.colorCount = colorCount;
        this.paletteColors = [];
        this.paletteColors[0] = [255,255,255];

        for(let i = 1; i < colorCount; i++){
            this.paletteColors[i] = [Math.random()*255, Math.random()*255,Math.random()*255];
        }
    }
}