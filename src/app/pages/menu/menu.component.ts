import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RatingService } from 'src/app/services/rating.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Rating } from 'src/app/models/rating.model';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit{

  recipes:Recipe[]=[];
  ratings:Rating[]=[];
  cartitem:Cart
  selectedQuantity:number=1;
  newRecipes:any[]=[]; 

  constructor(private recipeService: RecipeService,
              private ratingService: RatingService,
              private cartService: CartService,
              private datastorageService: DataStorageService,
              private authService:AuthService){}

  ngOnInit(): void {
     this.recipes=this.recipeService.getRecipes();
      this.ratings=this.ratingService.getRatings();
     
      // this.datastorageService.storeRecipes();
      // this.datastorageService.storeRatings();
}  

  inc(recipe:Recipe){
    if(recipe.quantity !=5)
    recipe.quantity+=1
  }

  dec(recipe:Recipe){
    if(recipe.quantity!=1){
      recipe.quantity-=1
    }
  }

  addtoCart(recipe: Recipe){
    this.cartService.getcartItems(recipe); 
    const addedRecipe=recipe;
    this.newRecipes=this.recipes;
     this.newRecipes.map(recipe=>{
      const newPropsObj={Msg:"Added to cart"}
      if(recipe===addedRecipe){
        Object.assign(recipe, newPropsObj)
        setTimeout(()=>{
         delete recipe.Msg
        }, 1000)
      }
    })
  }
}
