export class PixelGrid{
    width: number;
    height: number;
    pixels: number[][];
    
    constructor(width:number, height:number){
      this.width = Math.round(width);
      this.height = Math.round(height);
      this.pixels = [];
      for (let x = 0; x < width; x++){
        this.pixels[x] = [];
        for (let y = 0; y < height; y++){
          if (x%2 === 0){
            this.pixels[x][y] = 50;
          }else{
            this.pixels[x][y] = 150;
          }
        }
      }
    }
  }