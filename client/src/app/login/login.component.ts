import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'
import { Router } from '@angular/router';
import { TestServiceService } from '../test-service.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Login=new FormGroup({
    _userName: new FormControl(),
    _password: new FormControl()
  });
  
  errorMsg=""

  constructor(private location: Location,private router: Router,private testService:TestServiceService) { }

  ngOnInit(): void {
    
  }
  back(): void {
    this.location.back();
  }
  //User
  login() {
    //Check if filled
    if (!this.Login.get('_userName').value){
      this.errorMsg="Error: Please fill out username."
      return null;
    }
    else if (!this.Login.get('_password').value){
      this.errorMsg="Error: Please fill out password."
      return null;
    }
    return this.testService.login(this.Login.get('_userName').value, this.Login.get('_password').value).subscribe(data => {
      if (data.token=="false"){
        sessionStorage.clear();
        this.errorMsg=data.msg;
      }
      else if (data.token=="user"){
        this.errorMsg="";
        sessionStorage.setItem('userType',"user");
        sessionStorage.setItem('userName',data.content.userName);
        this.router.navigate(['/']); //Go to homepage, now signed in
      }
      else if (data.token=="admin"){
        sessionStorage.setItem('userType',"admin");
        sessionStorage.setItem('userName',data.content.userName);
        this.router.navigate(['/admin']);  //Go to admin page, now signed in
      }
    });
  }

  getErrorMsg(){return this.errorMsg;}
}
