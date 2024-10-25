import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { ShopListComponent } from './shop-list/shop-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
       { path: 'product-view/:product-name', component: ProductViewComponent },
       {path:'shopping-cart',component:ShoppingCartComponent},
       {path:'checkout',component:CheckoutComponent},
       {path:'payment',component:PaymentComponent},
       {path:'shop-list',component:ShopListComponent}

      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
