import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchOn:boolean;
  signed_in:boolean

  constructor() { 
    this.searchOn=false;
    this.signed_in=false; //based on session
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
