import { Component, ElementRef, HostBinding, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  cartsubscription: Subscription;
  userSub: Subscription;
  collapsed=true;
  isAuthenticated=false;

    @HostListener('document:click', ['$event']) toggle(event:Event){
        this.collapsed=this.elRef.nativeElement.contains(event.target)? !this.collapsed : true;
    }

    cartQuantity:number;

    constructor(private elRef: ElementRef,
                private cartService: CartService,
                private authService: AuthService,
                private route: Router){}


                ngOnInit(): void {
                  this.cartsubscription=this.cartService.cartChanges.subscribe(cart=>{
                    this.cartQuantity=cart.length;
                  })
                  this.userSub=this.authService.user.subscribe(user=>{
                    this.isAuthenticated =!!user;
                  })
                }

                onLogout(){
                  this.authService.logout();
                  this.route.navigate(['/auth']);
                }

                ngOnDestroy(): void {
                    this.cartsubscription.unsubscribe;
                    this.userSub.unsubscribe;
                }
}
