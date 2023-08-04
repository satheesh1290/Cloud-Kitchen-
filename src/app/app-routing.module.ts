import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { resolve } from './services/recipe-resolver.service';

const routes: Routes = [
  {path:'', component: HomeComponent, resolve: {data: resolve}},
  {path:'about', component: AboutComponent},
  {path:'menu/:id', loadChildren:()=>import('./recipe/menudetail/menudetail.module').then(m=>m.MenudetailModule)},
  {path:'auth', loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
