import { Component, OnInit } from '@angular/core';
import { CartService } from '../../auth-profile/_services/cart.service';
import { ProductService } from '../../auth-profile/_services/product.service';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
declare function appInit([]): any;
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  product: any;

  constructor( private cartService: CartService,private productService:ProductService,private route:ActivatedRoute) { }

  ngOnInit(): void {
   

    this.route.paramMap.subscribe(params => {
      const productName = params.get('product-name');
      
      if (this.product && this.product.titulo !== productName) {
        window.location.reload(); 
      }

      this.productService.getProducts().subscribe(products => {
        this.product = products.find(p => p.titulo === productName);

        if (!this.product) {
          console.error('Producto no encontrado');
        }
      });
    });
  }
  ngAfterViewInit(): void {
    // Mueve la inicialización a AfterViewInit para garantizar que el DOM esté listo
    setTimeout(() => {
      appInit($);
    }, 50);
  }
  quantity: number = 1;

  increaseQuantity() {
    this.quantity++; 
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--; 
    }
  }

  addToCart() {
    
    const cartItem = {
      productId: this.product.id,
      name: this.product.name,
      price: this.product.price,
      quantity: this.quantity,
      image:this.product.image
    };

    console.log('Producto agregado al carrito:', cartItem);
    console.log('Image'+this.product.image)
    
    
    this.cartService.addToCart(cartItem);
  }
}
