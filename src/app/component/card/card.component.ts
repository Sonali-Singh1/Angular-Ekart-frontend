import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  public cardList!: any;
  id = 1;
  submit!: boolean;
  successMsg!: string;
  message!: string;
  cardForm!: FormGroup;
  password!:any;
  show=false;
  constructor(private api : ApiService, private formBuilder: FormBuilder, private router: Router) { }
  addAddress(){
    this.show=!this.show;
 }
 
 public selectedRow!:any[];
 rowClicked=false;
 setClickedRow = function(this:any,index:any){
   this.selectedRow = index;
   this.rowClicked=true;
 }

 pay() {
   let card = {customerId: this.id,...this.cardForm.value}
   this.submit = true;
   this.api.addCard(card).subscribe(res=>{
       this.message=res;
       console.log(this.message);
    });
}
 
 
 ngOnInit() {
  this.api.getCards(this.id).subscribe(res=>{
    this.cardList = res;
    console.log(this.cardList);
  });
   this.cardForm = this.formBuilder.group({
     cardNumber: ['', [Validators.required]],
     cardHolder:['',[Validators.required]],
     expiryMonth:['',[Validators.required]],
     expiryYear:['',[Validators.required]]
   });
  }
 
 
}
