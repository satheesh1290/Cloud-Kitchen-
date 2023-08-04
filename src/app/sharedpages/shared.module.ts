import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { AlertComponent } from "./alert/alert.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [ 
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective],
    imports: [CommonModule],
    exports:  [ 
        CommonModule,
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective]
})
export class SharedModule{}