import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { MenuComponent } from "../pages/menu/menu.component";
import { MenudetailComponent } from "./menudetail/menudetail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeComponent } from "./recipe.component";
import { RecipeService } from "../services/recipe.service";
import { RatingService } from "../services/rating.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RecipeRoutingModule } from "./recipe-routing.module";
import { SummaryComponent } from "../summary/summary.component";
import { SharedModule } from "../sharedpages/shared.module";



@NgModule({
    declarations:[
        MenuComponent,
        MenudetailComponent,
        RecipeEditComponent,
        RecipeComponent,
        SummaryComponent
    ],
    imports: [
        RecipeRoutingModule,
        ReactiveFormsModule,
        NgbModule,
        SharedModule
      ],
   
     providers: [RecipeService, RatingService]
})

export class RecipesModule{}