import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from '../models/cart.model';
import { CartService } from '../services/cart.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, OnDestroy{
  cartsubscription: Subscription;
  totalsubscription: Subscription;
  carts:Cart[]=[];
 totalAmount:number;
 cartQuantity:number;
 success:string;

 addressForm!: FormGroup;

   constructor(private cartService: CartService){}
 
   ngOnInit() {
     this.carts=this.cartService.getcart();
     this.cartQuantity=(this.carts).length;
     this.cartsubscription=this.cartService.cartChanges.subscribe(cart=>{
        this.carts=cart;
        this.cartQuantity=cart.length;
       })

       this.totalAmount=this.cartService.gettotalAmount();
       this.totalsubscription=this.cartService.totalChanges.subscribe(total=>{
        this.totalAmount=total;
       })

       this.initForm();
   }

   inc(cart:Cart, index:number){
    if(cart.quantity!=5){
      this.cartService.updateTotal(index)
      cart.quantity+=1;
      this.cartService.newTotal(index)
    }
  }

  dec(cart:Cart, index:number){
    if(cart.quantity!=1){
      this.cartService.updateTotal(index)
      cart.quantity-=1;
      this.cartService.newTotal(index)
    }
  }

   onRemove(index:number){
    this.cartService.updateCart(index)
   }

   onSubmit(){
    if(!this.addressForm.valid){
      return;
    }
    this.success='Order Successfully Placed. Thank You!';
    this.addressForm.reset();
   }

   get user(){
    return this.addressForm.get('name')
  }

  get phone(){
    return this.addressForm.get('phone')
  }

  get address(){
    return this.addressForm.get('address')
  }

  private initForm(){
    let name='';
    let phone:number;
    let address='';
    this.addressForm=new FormGroup({
      name: new FormControl(name, [Validators.required, Validators.pattern('[a-zA-Z% ]*'), Validators.minLength(4)]),
      phone: new FormControl(phone, [Validators.required, Validators.pattern('[0-9]{10}')]),
      address: new FormControl(address, [Validators.required])
    });
  }

   onClose(){
      this.success=null;
    }
 
   ngOnDestroy(){
    this.cartsubscription.unsubscribe;
    this.totalsubscription.unsubscribe;
   }
}
