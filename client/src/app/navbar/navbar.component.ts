import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchOn:boolean;
  signed_in:boolean

  constructor(private router:Router) { 
    this.searchOn=false;
    //Check if signed in
    if (sessionStorage.getItem('userType')=="user")
    this.signed_in=true; //based on session
  }

  ngOnInit(): void {
  }

  toggleSearch(){
    this.searchOn=!this.searchOn;
  }

  signedIn(){
    return this.signed_in;
  }

  getUserName(){
    return sessionStorage.getItem('userName');
  }

  signOut(){
    sessionStorage.clear();
    this.signed_in=false;
    this.router.navigate(['/']);  //Go to home page, now signed out

  }

}
