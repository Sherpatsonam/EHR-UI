import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchModule } from './search/search.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {DateValueAccessorModule} from 'angular-date-value-accessor';

@NgModule({
  declarations: [
    AppComponent,HomeComponent
  ],
  imports: [
    SearchModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    DateValueAccessorModule,
    RouterModule.forRoot([
     
      {path:'home',component: HomeComponent},
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'**',redirectTo:'home',pathMatch:'full'}
   
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
