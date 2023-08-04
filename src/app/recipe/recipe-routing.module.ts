import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { Admin } from "../auth/auth-guard";
import { SummaryComponent } from "../summary/summary.component";
import { MenuComponent } from "../pages/menu/menu.component";
import { resolve } from "../services/recipe-resolver.service";
import { ratingResolve } from "../services/rating-resolver.service";

const routes: Routes=[
  {path:'menu', component: MenuComponent, resolve: {data: resolve, ratingResolve}},
{path:'new', component: RecipeEditComponent, canActivate:[Admin]},
{path:'ordersummary', component: SummaryComponent}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RecipeRoutingModule{}