import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { TestServiceService } from './test-service.service';
import { HttpClientModule } from '@angular/common/http';
//import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
   // HttpClientModule
  ],
  providers: [TestServiceService, HttpClientModule],
  bootstrap: [TestComponent]
})
export class AppModule { }
