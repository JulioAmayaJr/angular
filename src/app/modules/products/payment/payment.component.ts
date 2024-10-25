import { Component, OnInit } from '@angular/core';
import { CartService } from '../../auth-profile/_services/cart.service';
declare var $: any;
declare function appInit([]): any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cartItems: any[] = [];
  subtotal:number=0;
  total: number = 0;
  
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    setTimeout(() => {
      appInit($);
    }, 50);
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateSubTotal();
      this.calculateTotal();
    });
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

}
