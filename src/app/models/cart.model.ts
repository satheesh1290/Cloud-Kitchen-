export class Cart{
    public name:string;
    public imagePath:string;
    public price: number;
    public quantity: number;
   


    constructor(name:string, imagePath:string, price: number, quantity: number){
        this.name=name;
        this.imagePath=imagePath;
        this.price=price;
        this.quantity=quantity;
    }
}