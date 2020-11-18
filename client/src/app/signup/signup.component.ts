import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TestServiceService } from '../test-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  SignUp=new FormGroup({
    _userName: new FormControl(),
    _password: new FormControl(),
    _email: new FormControl(),
    _phone: new FormControl()
  });
  
  errorMsg=""

  constructor(private location: Location,private router: Router,private testService:TestServiceService) { }

  ngOnInit(): void {
    
  }
  back(): void {
    this.location.back();
  }

  createUser() {

    //Check if filled
    if (!this.SignUp.get('_userName').value){
      this.errorMsg="Error: Please fill out username."
      return null;
    }
    else if (!this.SignUp.get('_password').value){
      this.errorMsg="Error: Please fill out password."
      return null;
    }
    else if (!this.SignUp.get('_email').value){
      this.errorMsg="Error: Please fill out email."
      return null;
    }
    else if (!this.SignUp.get('_phone').value){
      this.errorMsg="Error: Please fill out phone."
      return null;
    }
    let json = {
      "userName": this.SignUp.get('_userName').value,
      "password": this.SignUp.get('_password').value,
      "email": this.SignUp.get('_email').value,
      "phone": this.SignUp.get('_phone').value
      }; 
      return this.testService.createUser(json).subscribe(data => {
        if (data.token=="false"){
          sessionStorage.clear();
          this.errorMsg=data.msg;
        }
        else if (data.token=="true"){
          this.errorMsg="";
          sessionStorage.setItem('userType',"user");
          sessionStorage.setItem('userName',data.content.userName);
          this.router.navigate(['/']); //Go to homepage, now signed in
        }
      });
    
  }
  getErrorMsg(){return this.errorMsg;}


}
