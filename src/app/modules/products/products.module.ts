import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { SharedModule } from "../../shared/shared.module";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopListComponent } from './shop-list/shop-list.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductViewComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    PaymentComponent,
    ShopListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
]
})
export class ProductsModule { }
