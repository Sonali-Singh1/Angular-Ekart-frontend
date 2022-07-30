import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup
  constructor(private router: Router, private formbuilder: FormBuilder,private service: SignupService) { }

  ngOnInit(): void {
    this.registerForm=this.formbuilder.group({
      name: ['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
      password: ['',[Validators.required,Validators.pattern('((?=.*\\d)(?=.*[$@$!%*?&])(?=.*[a-z])(?=.*[A-Z]).{8,30})')]],
      confirmPassword: ['',{updateOn:'blur',validators:[Validators.required, pwdValidation]}],
      city: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      state: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      country: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      dateOfBirth: ['',[Validators.required,this.validateDate]],
      mobileNo: ['',[Validators.required,Validators.pattern(/^\d{10}$/)]],
      pincode: ['',[Validators.required,Validators.pattern(/^\d{6}$/)]],
      gender:['', Validators.required],
      email: ['',[Validators.required, Validators.email]]
  });
  }
  errMsg=''
  onPasswordChange(){
    if(this.registerForm.value.confirmPassword!=this.registerForm.value.password){
      this.errMsg='Password and Confirm Password should be matched!!'
    }
  }
  validateDate = (c: FormControl) => {
    let date:any = new Date();
    let selectedDate:any = new Date(c.value);
    
    let datediff:any = new Date((date - selectedDate)).getFullYear() - 1970;
    console.log("datediff", datediff)
    if(datediff < 20 || datediff> 100){
      return {InvalidDate: "Age should be between 20 and 100 years"}
    }
    return null;

  }
  msg=''
  isEmail=true
  register(){
    this.service.getAllUsers().subscribe((users: any)=>{
      console.log('users :',users);
      users.forEach((user: any) => {
        console.log('email ',user.email)
        console.log('email1 ',this.registerForm.value.email)
        if(this.registerForm.value.email==user.email){
          this.msg="This email is already present!!"
          this.isEmail=false
          console.log('isEmail ',this.isEmail)
        }        
      });
      console.log('isEmail1',this.isEmail)
      if(this.isEmail==true){
        this.addUsers();
      }
    });
  }
  addUsers(){
  this.service.addUsers(this.registerForm.value).subscribe((user: any)=>
      {
        console.log('user :',user);
        this.msg="Added successfully. Your user id is :"+user.id;
        console.log('user id :',user.id)
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 10000);
      },
      (err: any)=>{
        console.log(err.status);
        this.router.navigate(['/login']);
       }
      )}
}
function pwdValidation(c: FormControl): any{
    if(c && c.value){
      if(c.value===c.root.get('password')?.value){
        return null
      }
      else{
        return {
          pwdMismatch: {
            message: 'Password and Confirm Password do not match'
          }
        }
      }
    }
}
  