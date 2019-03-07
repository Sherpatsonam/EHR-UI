import { Component, OnInit } from '@angular/core';
import {Month} from './month';

@Component({
    selector: 'month-picker',

    template: `
    <div>

    <div class="col-xs-2">      
    <select class="form-control"  required>
            <option  *ngFor="let p of months"  [selected]="mm === p.val ">{{p.name}}</option>    
    </select>
    </div>

    </div>`
})

export class MonthPicker implements OnInit {

private mm : number;
months = [
        { val: '01',  name: 'Jan' },
        { val: '02',  name: 'Feb' },
        { val: '03',  name: 'Mar' },
        { val: '04',  name: 'Apr' },
        { val: '05',  name: 'May' },
        { val: '06',  name: 'Jun' },
        { val: '07',  name: 'Jul' },
        { val: '08',  name: 'Aug' },
        { val: '09',  name: 'Sep' },
        { val: '10',  name: 'Oct' },
        { val: '11',  name: 'Nov' },
        { val: '12',  name: 'Dec' }
    ];

    ngOnInit() {  this.getMonth(); 

    }  

    getMonth(){
    var today = new Date();
    this.mm = today.getMonth()+1;     
    
    }




}