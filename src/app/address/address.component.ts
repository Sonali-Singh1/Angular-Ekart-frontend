import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  submit!: boolean;
  successMsg!: string;
  errorMsg!: string;
  addressForm!: FormGroup;
  password!:any;
  show=false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  register() {
    // this.submit = true;
    // this.registerService.register(this.registerForm.value).subscribe(
    //   data => {if(data.errorCode==502){console.log("here");
    //     this.errorMsg="Email id already present";
    //     this.submit=false;
    //   }
    // else{
    //   this.successMsg="Registered Successfully!"
    // }},
    //   error => {
    //     this.errorMsg = error;
    //     this.submit = false;
    //   }
    // );
  }
savedAddress(){
  this.show=!this.show
}
  ngOnInit() {
    this.addressForm=this.formBuilder.group({
      city: ['', Validators.required],
      zip: ['',Validators.required],
      destination:['', Validators.required],
      car: ['',[ Validators.required]],
      seatsAvailable:['', Validators.required]
    })
  }

}
