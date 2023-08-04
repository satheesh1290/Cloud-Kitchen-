import { ResolveFn } from "@angular/router";
import { Recipe } from "../models/recipe.model";
import { ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";
import { inject } from "@angular/core";
import { DataStorageService } from "../services/data-storage.service";
import { RecipeService } from "./recipe.service";


export const resolve: ResolveFn<Recipe[]>=(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[]=>{
        const datastorageService = inject(DataStorageService);
       const recipeService = inject(RecipeService)
        const recipes= recipeService.getRecipes();

        if(recipes.length ===0){
            return datastorageService.fetchRecipes();
        }else
        {
           return recipes;
        }
    }