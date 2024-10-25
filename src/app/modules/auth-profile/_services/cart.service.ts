import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = this.getCartFromLocalStorage();
  public cartItemsSubject = new BehaviorSubject<any[]>(this.cartItems);

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.cartItemsSubject.next(this.cartItems); 
  }

  addToCart(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartToSession(); 
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getCartItems() {
    return this.cartItems;
  }

  private saveCartToSession() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private loadCartFromSession(): any[] {
    const savedCart = sessionStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  private getCartFromLocalStorage(): any[] {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  private loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.cartItemsSubject.next(this.cartItems);
    }
  }
  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find(cartItem => cartItem.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.cartItemsSubject.next(this.cartItems);
      this.saveCartToSession(); 
    }
  }
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartToSession(); 
  }
  
  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    sessionStorage.removeItem('cartItems'); 
  }
}
