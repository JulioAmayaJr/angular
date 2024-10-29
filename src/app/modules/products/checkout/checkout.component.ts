import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CartService } from '../../auth-profile/_services/cart.service';

import { Router } from '@angular/router';
import { AuthService } from '../../auth-profile/_services/auth.service';
declare var $: any;
declare function appInit([]): any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  subtotal:number=0;
  total: number = 0;
  termsAccepted: boolean = false; 
  billingForm!: FormGroup;
  isLoading = true; 

  constructor(private cartService:CartService,private router: Router,private authService:AuthService) { }

  ngOnInit(): void {
    if (!this.authService.user) {
      this.router.navigate(['/auth/login']);
    } else {
      setTimeout(() => {
        appInit($);
      }, 50);
      
      this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
        this.calculateSubTotal();
        this.calculateTotal();
      });
    }
    this.isLoading = false;
  }
  calculateSubTotal():void{
    this.subtotal=this.cartItems.reduce((sum,item)=>sum+(item.price*item.quantity),0)
  }
  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if(this.total<50){
      this.total=this.total+3;
    }
  }
  placeOrder(): void {
   
      this.router.navigate(['/product/payment']);

  }

}
