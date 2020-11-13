import { Component, OnInit } from '@angular/core';
import { TestServiceService } from '../test-service.service';
import { testConnection } from '../test_structure';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  private result:testConnection;

  constructor(public testService:TestServiceService) {
    this.result = new testConnection();
    this.testConnection();
   }

  ngOnInit(): void {
  }

  testConnection(){
    return this.testService.testConnection().subscribe(data=>this.result.construct(data));
  }

  getResult(){
    return this.result.get_id()+" : "+this.result.getContent();
  }

}
