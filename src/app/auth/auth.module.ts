import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth-interceptor.service";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../sharedpages/shared.module";

@NgModule({
declarations:[AuthComponent],
imports: [
    CommonModule, 
    FormsModule, 
    RouterModule.forChild([{path:'', component: AuthComponent}]),
    SharedModule
],
exports: [RouterModule],
providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}],
})

export class AuthModule{}