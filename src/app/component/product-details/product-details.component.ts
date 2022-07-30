import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product:any;
  dealPrice!:number;

  constructor(private api : ApiService, private route:ActivatedRoute, private cartService:CartService) { }

  ngOnInit(): void {
    let temp = this.route.snapshot.paramMap.get('id');
    console.log(temp);
    this.api.getProduct(temp)
    .subscribe(res=>{
      this.product = res;
      console.log(this.product);
      this.dealPrice = this.product.price - this.product.price * this.product.discount * 0.01;
      console.log(this.dealPrice);
    });
  }

  addtocart(item : any){
    this.cartService.addtoCart(item)
  }

}
