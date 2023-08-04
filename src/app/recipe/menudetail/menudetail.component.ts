import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FormControl } from '@angular/forms';
import { RatingService } from 'src/app/services/rating.service';
import { Rating } from 'src/app/models/rating.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-menudetail',
  templateUrl: './menudetail.component.html',
  styleUrls: ['./menudetail.component.css']
})
export class MenudetailComponent implements OnInit {

  selectedrecipe:Recipe;
  index: number;
  raters:Rating;
  Admin:boolean;

  ratingcontrol = new FormControl(0);
  ratedUsers=0;
  totalratings=0;
  finalrating:any;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private ratingService: RatingService,
              private datastorageService: DataStorageService,
              private authService:AuthService
              ){}
 
  ngOnInit(){
        this.route.params.subscribe(
          (params: Params)=>{
              this.index= +params['id'];
             this.selectedrecipe= this.recipeService.getRecipe(this.index);
             this.Admin=this.authService.isAuthor;
          }
        )
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.index);
    this.ratingService.deleteRating(this.index);
    this.datastorageService.storeRecipes();
    this.datastorageService.storeRatings();
    this.router.navigate(['/menu']);
  }
  

 getRate(){
  this.raters=this.ratingService.getRating(this.index)
  this.ratedUsers=this.raters.ratedUsers;
  this.totalratings=+(this.raters.totalratings);
  this.ratedUsers++;
  this.totalratings +=this.ratingcontrol.value || 0;
  this.finalrating =(this.totalratings/this.ratedUsers).toFixed(1);
  let newratedusers=this.ratedUsers;
  let newfinalrating=this.finalrating;
  this.raters={finalrating:newfinalrating, ratedUsers:newratedusers, totalratings:this.totalratings};
  this.ratingService.updateRating(this.index, this.raters);
  this.datastorageService.storeRatings();
 }
 
}
