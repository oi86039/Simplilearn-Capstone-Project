import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TestServiceService } from '../test-service.service';
import { Item } from '../test_structure';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchOn:boolean;
  signed_in:boolean
  items:Item[];

  Search=new FormGroup({
    _name: new FormControl()    
  });

  constructor(private router:Router, private testService:TestServiceService) { 
    this.searchOn=false;
    //Check if signed in
    if (sessionStorage.getItem('userType')=="admin")
    this.router.navigate(['/admin'])
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

  accessCart(){
    if (sessionStorage.getItem('userName'))
    this.router.navigate(['/cart']);  
    else
    this.router.navigate(['/login']);    
  }

  findProductsByName() {
    return this.testService.findProductsByName(this.Search.get("_name").value).subscribe(data => {
      this.items = [];
      if (data.token) {
        for (let a of data.content)
          this.items.push(new Item(a));
      }
    });
  }

}
