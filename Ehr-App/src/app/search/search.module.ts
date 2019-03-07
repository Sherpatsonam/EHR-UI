import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import {RouterModule} from '@angular/router';

import { UpdateComponent } from './update.component';
import { SearchComponent } from './search.component';


import { PatientFilter } from './patientFilter.pipe';
import { AddComponent } from './add.component';
import {DateValueAccessorModule} from 'angular-date-value-accessor';
import { MonthPicker } from './month-picker';

@NgModule({
  imports: [CommonModule,DateValueAccessorModule, FormsModule,RouterModule.forChild([
      {path:'search',component: SearchComponent },
      {path:'search/add',component: AddComponent},
      {path:'search/:id',component: UpdateComponent},
     
     // {path:'search/patient/:name/:zipcode/:id',component: AllergyComponent}
      //{path:'employee/:cf/:id',redirectTo:'employees/:id', pathMatch:'full' },
      //{path:'employee/:cf',component: EmployeeComponent , pathMatch:'full'},
      

    ])],
  declarations: [SearchComponent,PatientFilter,UpdateComponent,AddComponent,MonthPicker],

})
export class SearchModule {


 }
