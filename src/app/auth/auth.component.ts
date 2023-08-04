import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PlaceholderDirective } from '../sharedpages/placeholder/placeholder.directive';
import { AlertComponent } from '../sharedpages/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls:['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading= false;
  // error:string = null;
@ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

private closeSub: Subscription;

  constructor(private authService: AuthService,
              private route: Router){}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid){
      return;
    }
    const email=form.value.email;
    const password=form.value.password;

    let authObservable:Observable<AuthResponseData>;

    this.isLoading=true;

    if(this.isLoginMode){
      authObservable=this.authService.login(email, password)
    }else{
      authObservable=this.authService.signup(email, password)
    }
    
  authObservable.subscribe({
    next: resData=>{
      this.isLoading=false;
      this.route.navigate(['/menu']);
    },
    error: errorMessage=>{
      // this.error=errorMessage;
      this.showErrorAlert(errorMessage);
      this.isLoading=false;
    }
  });

    form.reset();
  }

  //method used when component reders using ngIf

  // onClose(){
  //   this.error=null;
  // }

  //Dynamic component creation for showing alert

  showErrorAlert(errorMessage:string){
    const hostViewContainerRef = this.alertHost.viewcontainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message=errorMessage;
    this.closeSub=componentRef.instance.close.subscribe(()=>{
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
    })
  }

  ngOnDestroy(): void {
      if(this.closeSub){
        this.closeSub.unsubscribe();
      }
  }

}
