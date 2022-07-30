import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { CardComponent } from './component/card/card.component';
import { CartComponent } from './component/cart/cart.component';
import { LoginGuardService } from './component/login/login-guard.service';
import { LoginComponent } from './component/login/login.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { ProductsComponent } from './component/products/products.component';
import { SignupComponent } from './component/signup/signup.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  {path:'', redirectTo:'products',pathMatch:'full'},
  {path:'products', component: ProductsComponent},
  {path:'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'card' , component: CardComponent, canActivate:[LoginGuardService]},
  {path: 'notification', component: NotificationComponent, canActivate:[LoginGuardService]},
  {path:'products/:id',component:ProductDetailsComponent},
  {path: 'address', component: AddressComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
