import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products: any =[];
  public grantTotal !: number;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    console.log('isUserLogin',sessionStorage.getItem('isUserLoggedin'))
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products =res;
      this.grantTotal=this.cartService.getTotalPrice();
    })
  }

  removeItem(item : any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

}
