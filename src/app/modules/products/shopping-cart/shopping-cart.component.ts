import { Component, OnInit } from '@angular/core';
import { CartService } from '../../auth-profile/_services/cart.service';

declare var $: any;
declare function appInit([]): any;
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  subTotal:number=0;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateSubTotal();
      this.calculateTotal();
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      appInit($);
    }, 50);
  }
  calculateSubTotal():void{
    this.subTotal=this.cartItems.reduce((sum,item)=>sum+(item.price*item.quantity),0);
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if(this.total<50){
      this.total=this.total+3;
    }
  }
  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  increaseQuantity(item: any) {
    this.cartService.updateQuantity(item.productId, item.quantity + 1);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.productId, item.quantity - 1);
    }
  }

}
