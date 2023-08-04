import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../models/recipe.model';
import { map, tap } from 'rxjs/operators';
import { RatingService } from './rating.service';
import { Rating } from '../models/rating.model';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DataStorageService{
Recipes_Url=environment.RECIPES_URL;
Ratings_Url=environment.RATINGS_URL;

    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private ratingService: RatingService,
                private authService: AuthService){}

// store Recipes
    storeRecipes(){
      const recipes= this.recipeService.getRecipes();
      this.http.put(this.Recipes_Url, recipes)
      .subscribe(res=>{
        // console.log(res);
      })
    }
    //store Ratings
    storeRatings(){
      const ratings=this.ratingService.getRatings();
      this.http.put(this.Ratings_Url, ratings)
      .subscribe(res=>{
        // console.log(res);
      })
    }

    //fetch Recipes
    fetchRecipes(){
       return this.http
        .get<Recipe[]>(this.Recipes_Url)
        .pipe(
          map(recipes => {
            return recipes
          }),
          tap(recipes =>{
            this.recipeService.setRecipes(recipes);
          })
        );
    }

    //fetch Ratings

    fetchRatings(){
     return this.http
        .get<Rating[]>(this.Ratings_Url)
        .pipe(
          map(ratings => {
            return ratings
          }),
    
          tap(ratings =>{
            this.ratingService.setRatings(ratings)
          })
        )
    }
}
