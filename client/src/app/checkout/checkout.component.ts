import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
    
  }
  back(): void {
    this.location.back();
  }

}
