import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  constructor(private route: Router, private formbuilder: FormBuilder,private service: LoginService) { }

  ngOnInit(): void {
    this.loginForm=this.formbuilder.group({
      id: ['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(10)]]
    })
  }
  id!: any;
  password!: any;
  msg=''
  login(){
    this.id=this.loginForm.value.id
    this.password=this.loginForm.value.password
    console.log('id',this.id)
    console.log('id1',this.loginForm.value.id)
    sessionStorage.setItem('isUserLoggedin','false')
    this.service.getUsers(this.id).subscribe((e: any)=>
    {
      console.log('user1 :',e);
      if(this.id==e.id && this.password==e.password){
        sessionStorage.setItem('userId',this.id)
        sessionStorage.setItem('isUserLoggedin','true')
        console.log('isUser ',sessionStorage.getItem('isUserLoggedin'))
        this.route.navigate(['/products']);
      }
      else{
        this.msg="Invalid creadentials"
      }

    },(err: any)=>{
      console.log(err.status)
        if(err.status===404){
          this.msg='Invalid credentials';
        }
    }
    )
  }
}
