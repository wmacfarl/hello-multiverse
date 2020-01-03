export class TilePalette{
    imagePath:string;
    description:string;
    tileSize:number;
    xOffset: number;
    yOffset: number;
    xMargin: number;
    yMargin: number;

    constructor(imagePath:string, description:string){
        this.imagePath=imagePath;
        this.description = description;
    }
}