import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from '../models/cart.model';
import { RecipeService } from './recipe.service';
import { Recipe } from '../models/recipe.model';


@Injectable({ providedIn: 'root' })

export class CartService implements OnInit{
  cartChanges= new Subject<Cart[]>();
  totalChanges=new Subject<number>();

  recipes:Recipe[]=[];
  private cart:Cart[]=[];
  quantity:number;
  private totalAmount:number=0;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {

  }


getcart(){
  return this.cart;
}

gettotalAmount(){
  return this.totalAmount
}

getcartItems(recipe:any){
    let cartitem=new Cart(recipe.name, recipe.imagePath, recipe.price, recipe.quantity);
    let productname=recipe.name;
    let matchingItem:Cart;
    
    this.cart.forEach((item)=>{
      if(productname === item.name){
        matchingItem=item;
      }
    })
    
    if(matchingItem){
      this.totalAmount-=matchingItem.price*matchingItem.quantity;
      matchingItem.quantity=cartitem.quantity;
      this.cartChanges.next(this.cart.slice())
      this.totalAmount +=cartitem.price*cartitem.quantity;
      this.totalChanges.next(this.totalAmount)
    }else{
     this.cart.push(cartitem);
      this.cartChanges.next(this.cart.slice());
      this.totalAmount +=cartitem.price*cartitem.quantity;
    }
    this.totalChanges.next(this.totalAmount)
}

updateTotal(index:number){
  this.totalAmount-=(this.cart[index].price * this.cart[index].quantity);
  this.cartChanges.next(this.cart.slice());
  this.totalChanges.next(this.totalAmount)
}

newTotal(index:number){
  this.totalAmount+=(this.cart[index].price * this.cart[index].quantity);
  this.cartChanges.next(this.cart.slice());
  this.totalChanges.next(this.totalAmount)
}


updateCart(index:number){
  this.totalAmount-=(this.cart[index].price * this.cart[index].quantity);
  this.cart.splice(index, 1);
  this.cartChanges.next(this.cart.slice());
  this.totalChanges.next(this.totalAmount)
}
}

