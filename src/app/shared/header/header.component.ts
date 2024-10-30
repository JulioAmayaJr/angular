import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth-profile/_services/auth.service';
import { CartService } from 'src/app/modules/auth-profile/_services/cart.service';
import { CategoryService } from 'src/app/modules/auth-profile/_services/category.service';
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
  categories: any[] = [];
  categoriasDeNivelSuperior: any[] = [];
  categoriasSubSub:any[]=[]
  subcategories:any[]=[]

  constructor(
    public authService:AuthService,
    public cartService:CartService,
    private categoryService:CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    
      this.categoryService.getSubCategories().subscribe(subcategories => {
        this.subcategories = subcategories;
    
        this.categories.forEach(category => {
          const firstSubcategories = this.subcategories.filter(
            subcategory => subcategory.category_id === category.id_categorie && subcategory.parent_id === null
          );
    
          category.firstSubcategories = firstSubcategories;
              firstSubcategories.forEach(firstSubcategory => {
            firstSubcategory.children = this.subcategories.filter(
              child => child.parent_id === firstSubcategory.id_subcategory
            );
          });
    
        
        });
      });
    });
    
    this.user=this.authService.user;
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.cartTotal = this.cartService.getTotalItems();
      this.totalItem=items.length;
    });
  }


  
  getPairIndexes(array: any[]): number[] {
    return Array.from(
      { length: Math.ceil(array.length / 2) }, 
      (_, i) => i * 2
    );
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
