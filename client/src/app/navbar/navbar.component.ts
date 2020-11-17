import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchOn:boolean;

  constructor() { 
    this.searchOn=false;
  }

  ngOnInit(): void {
  }

  toggleSearch(){
    this.searchOn=!this.searchOn;
  }

}
