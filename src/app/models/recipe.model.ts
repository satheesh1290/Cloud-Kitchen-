


export class Recipe{
    public name:string;
    public description:string;
    public imagePath:string;
    public price: number;
    public quantity:number;


    constructor(name:string, desc:string, imagePath:string, price: number, quantity:number){
        this.name=name;
        this.description=desc;
        this.imagePath=imagePath;
        this.price=price;
        this.quantity=quantity;
    }
}