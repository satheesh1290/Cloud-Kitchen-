import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { Subject } from "rxjs";

@Injectable()

export class RecipeService{
  recipeChanges= new Subject<Recipe[]>();

  //  private recipes: Recipe[]=[
  //       new Recipe('Fruit Salad',
  //                 "This easy fruit salad is naturally sweet.", 
  //                 'https://images.unsplash.com/photo-1588068403046-169c80c69938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJ1aXQlMjBzYWxhZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //                 130, 1),                     
  //       new Recipe('Florentine pizza recipe', 
  //                 "Silky spinach, tangy tomato and fresh flavours for a delicious dinner.", 
  //                 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmxvcmVudGluZSUyMHBpenphfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  //                 349, 1),
  //       new Recipe('Curd Rice', 
  //                 "Helps to restore healthy microbial balance", 
  //                 'https://images.unsplash.com/photo-1633383718081-22ac93e3db65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNvdXRoJTIwaW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //                 95, 1),
  //       new Recipe('Chicken Briyani', 
  //                 "Rich in Vitamin-B6 which controls body's metabolic function", 
  //                 'https://images.unsplash.com/photo-1642821373181-696a54913e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJpeWFuaXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //                 185, 1),
  //       new Recipe('Burger',
  //                   "Burger Meat Is Packed With Nutrients", 
  //                   'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  //                   155, 1),
  //     ];

  private recipes: Recipe[]=[];
      constructor(){}

    

      setRecipes(recipes: Recipe[]){
        this.recipes=recipes;
        this.recipeChanges.next(this.recipes.slice());
      }

      getRecipes(){
        return this.recipes.slice();
      }

      getRecipe(index: number){
        return this.recipes[index];
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe)
        this.recipeChanges.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index]=newRecipe;
        this.recipeChanges.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipeChanges.next(this.recipes.slice());
      }


      
}