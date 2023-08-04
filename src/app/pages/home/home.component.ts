import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { RatingService } from 'src/app/services/rating.service';
import { Rating } from 'src/app/models/rating.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
recipes:Recipe[]=[];
ratings:Rating[]=[];

  constructor(private recipeService: RecipeService,
              private ratingService: RatingService,
              private datastorageService: DataStorageService){}

  ngOnInit(): void {
    this.recipes=this.recipeService.getRecipes();
    this.ratings=this.ratingService.getRatings();

    // this.datastorageService.fetchRecipes().subscribe();
    // this.datastorageService.fetchRatings().subscribe();
      
  }

}
