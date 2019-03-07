import { Component, OnInit } from "@angular/core";
import { IPatient } from "./IPatient";
import { PatientService } from "./patient.service";

@Component({
  
    templateUrl : './search.component.html',
    providers:[PatientService]
})

export class SearchComponent implements OnInit {
    ngOnInit(): void {
      
    }
  
add = false;
nameFilter:string;
zipFilter:number;
dobFilter:string;
genderFilter:string;
showTable=false;
errorMsg:string;
month:string;
day:string;
year:string; 
monthArray = [
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
dayArray:string[]=['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];



patients:IPatient[];
    
    /*[{
        id: 1508816919174,
        firstName: "john",
        middleName: "tss",
        lastName: "Sonam",
        gender: "male",
        dob: "1991-01-02",
        status: "active",
        dateCreated: "2017-12-12",
        dateModified: "2017-11-11",
        patientCode: 99887766,
        address: {street: "207",city: "dallas",state: "TX",zipCode: 75000},
        contactInfo: {email: "mahesh@gmail.com",homePhone: 90345678,cellPhone: 42957589,method: "email"}
    }]*/
    
  
    constructor(private patientService: PatientService){}
    SearchPatients(firstname:String, zipCode:number, gender:String, dob:String){
        this.patientService.getPatients(firstname,zipCode,gender,dob).subscribe((data)=> {this.patients=data;this.display();},
        err=>{this.errorMsg=<any>err;console.log("error= "+this.errorMsg);if(this.errorMsg!=null){
            this.add=true;
            this.showTable=false;
        };
    })
}
    /*SearchPatients(firstname:String, zipCode:number, gender:String, dob:String){
        this.patientService.getPatients(firstname,zipCode,gender,dob).subscribe((data)=> {this.patients=data;this.display();});
    }*/
                   
    search(){
        this.dobFilter=this.year+"-"+this.month+"-"+this.day;
        this.SearchPatients(this.nameFilter,this.zipFilter,this.genderFilter,this.dobFilter);
        console.log(this.dobFilter);
       
    }

    display(): void {
        debugger
        console.log(this.patients.length);

                  
        if(this.patients.length!=0){
            debugger
            
            this.add=false;
            this.showTable=true;
            console.log('records appears');
            }
            else{
                this.add=true;
                this.showTable=false;
                console.log('Add appears');
            }
   }
  

   /* Add(){
        for (var i = 0; i < this.patients.length; i++) {
         
     if(this.nameFilter!="null" && this.nameFilter==this.patients[i].firstName){
         debugger
         console.log("pt"+this.patients[i].firstName)
         this.add=false;
    
         console.log('add doesnot appears');
         }
         else{
             this.add=true;
             
             console.log('Add appears');
         }
}
    }*/
    reset(){
        this.showTable=false;
    }
   
     }



