export class ColorPalette{
    paletteColors;
    colorCount;
    colorToChangeIndex;

    constructor(colorCount){
        this.colorCount = colorCount;
        this.paletteColors = [];
        this.paletteColors[0] = [255,255,255];
        this.colorToChangeIndex = 0;
        for(let i = 1; i < colorCount; i++){
            this.paletteColors[i] = [Math.random()*255, Math.random()*255,Math.random()*255];
        }
    }
}