import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  searchOn:boolean;
  signed_in:boolean;

  constructor(private router:Router) { 
    this.searchOn=false;
    this.signed_in=false;
    //Check if signed in
    if (sessionStorage.getItem('userType')=="admin")
    this.signed_in=true;
    //if (sessionStorage.getItem('userType')=="user")
    //this.router.navigate(['/404'])
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
