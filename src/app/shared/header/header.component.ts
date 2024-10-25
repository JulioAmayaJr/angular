import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth-profile/_services/auth.service';
import { CartService } from 'src/app/modules/auth-profile/_services/cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any=null;
  cartItems: any[] = [];
  cartTotal: number = 0;
  itemCount: number = 0;
  totalItem:number=0;
  constructor(
    public authService:AuthService,
    public cartService:CartService
  ) { }

  ngOnInit(): void {
    this.user=this.authService.user;
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.cartTotal = this.cartService.getTotalItems();
      this.totalItem=items.length;
    });
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
  logout(){
    this.authService.logout();
  }
  loadCart() {
    this.cartItems = this.cartService.getCartItems(); 
    this.cartTotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0); 
    this.itemCount = this.cartService.getTotalItems(); 
  }
  getTotalPrice(): number {
    return parseFloat(this.cartItems
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2));
  }
  
}
