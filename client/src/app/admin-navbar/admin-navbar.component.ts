import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  searchOn:boolean;
  signed_in:boolean

  constructor() { 
    this.searchOn=false;
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
}
