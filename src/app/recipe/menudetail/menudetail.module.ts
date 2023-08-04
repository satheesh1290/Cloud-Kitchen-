import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeComponent } from "../recipe.component";
import { Admin, AuthGuard } from "src/app/auth/auth-guard";
import { resolve } from "src/app/services/recipe-resolver.service";
import { MenudetailComponent } from "./menudetail.component";
import { RecipeEditComponent } from "../recipe-edit/recipe-edit.component";


const routes: Routes=[
{path: '', component: RecipeComponent, canActivateChild:[AuthGuard], resolve: {data: resolve}, children:[
  {path:'', component: MenudetailComponent},         
  {path:'edit', component: RecipeEditComponent, canActivate:[Admin]}
]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MenudetailModule{}