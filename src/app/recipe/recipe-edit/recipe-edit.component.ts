import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { RatingService } from 'src/app/services/rating.service';
import { Recipe } from 'src/app/models/recipe.model';
import { Rating } from 'src/app/models/rating.model';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private ratingService: RatingService,
              private datastorageService: DataStorageService) {
  }

  ngOnInit() {
    this.route.parent.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['price'],
      this.recipeForm.value['quantity'])
    //   Ratings
      const newRating=new Rating(
        this.recipeForm.value['finalrating'],
        this.recipeForm.value['ratedUsers'],
        this.recipeForm.value['finalrating']
      )


    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe); 
      this.datastorageService.storeRecipes();
    } else {
      this.recipeService.addRecipe(newRecipe);
      this.datastorageService.storeRecipes();
      this.ratingService.addRating(newRating);
      this.datastorageService.storeRatings();
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipePrice:number;
    let recipefinalrating:any;
    let reciperatedUsers:number;

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      recipePrice = +(recipe.price);
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'price': new FormControl(recipePrice, Validators.required),
      'quantity':new FormControl(1, Validators.required),
      'finalrating':new FormControl(recipefinalrating, [Validators.max(5), Validators.min(0)]),
      'ratedUsers':new FormControl(reciperatedUsers, [Validators.max(2), Validators.min(0)])
    });
  }



}
