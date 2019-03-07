
import {Location} from '@angular/common';
import { Component, OnInit } from "@angular/core";
import { IPatient } from "./IPatient";
import { IAllergy } from "./IAllergy";
import { Observable } from 'rxjs/Observable';
import { PatientService } from './patient.service';
import { ActivatedRoute } from '@angular/router';
import { IAllergies } from './IAllergies';
import { UAllergy } from './UAllergy';

@Component({
    
      templateUrl : './update.component.html',
      providers:[PatientService]
  })
  
  export class UpdateComponent implements OnInit{
    constructor(private _location: Location, private patientService: PatientService,private _route: ActivatedRoute){ }
    goback(){
        this._location.back();
    }
  
  ngOnInit(){
    
    var id=+this._route.snapshot.params['id'];
    this.fetchPatient(id);
  }
  private key:String;
  private event: KeyboardEvent;
    patGender:String[]=['male','female'];
    patMethod:String[]=['email','homePhone','cellPhone'];
    activate=true;
    deactivate=false;
    showAllergies=false;
    showadd=false;
    errorMsg:string;
    currentPatient:IPatient={
      id: null,
      firstName: "",
      middleName: "",
      lastName:"",
      dob:"",
      gender:"",
      address:{street:"",city:"",state:"",zipCode:null},
      contactInfo:{email:"",homePhone:null,cellPhone:null,method:""},
      status:"",
      dateCreated:"",
      dateModified:"",
      patientCode:"",
      patAll: [{
            patientAllergyId: null,
            allergyId: null,
            patientId: null,
            dateCreated: "",
             }]
      }
      addAllergy:IAllergy={
        patientAllergyId: null,
        allergyId: null,
        patientId: null,
        dateCreated: "",
         }
  currentAllergy:IAllergies= {
    
    allergyCode: null,
    allergyDescription: "",
    allergyId: null
  }
  alist:UAllergy;
  allList:UAllergy[]=[];


  allergies:IAllergy[];

    
  
  save(){
    
    this.modifyPatient();
    debugger
    console.log(this.currentPatient.firstName);
    console.log(this.currentPatient.lastName);
    console.log(this.currentPatient.middleName);
    console.log(this.currentPatient.dob);
    console.log(this.currentPatient.gender);
    console.log(this.currentPatient.address.city);
    console.log(this.currentPatient.address.zipCode);
    console.log(this.currentPatient.contactInfo.email);
    console.log(this.currentPatient.contactInfo.cellPhone);
    console.log(this.currentPatient.contactInfo.method);
  }
  
  activateStatus(){
    this.currentPatient.status="Activated";
    this.activate=false;
    this.deactivate=true;
    console.log(this.currentPatient.status);
  }

  deactivateStatus(){
    this.currentPatient.status="De-Activated";
    this.activate=true;
    this.deactivate=false;
    console.log(this.currentPatient.status);
  }
searchAllergy(){
  debugger
  this.fetchAllergy(this.currentAllergy.allergyCode);
   
}
private onKeyPress(event: KeyboardEvent): void {
  this.key = event.key;
  if(this.key=="Enter"){
    this.searchAllergy();
  }
}
reset(){
  this.currentAllergy.allergyDescription="";
  this.currentAllergy.allergyCode=null;
}
patAllergies(){
  if(this.allergies && this.allergies.length){
this.showAllergies=true;
  }
  else{
    this.showAllergies=false;
  }
  
    
}
fetchPatient(id:number):void{
  this.allList=[];
  this.patientService.getPatient(id).subscribe((data)=>{
  this.currentPatient=data;this.allergies=this.currentPatient.patAll;this.showAllergiesTable();this.statusButton();this.patAllergies();this.addAllergy.patientId=this.currentPatient.id;});
}

modifyPatient(){
  this.patientService.updatePatient(this.currentPatient).subscribe((data)=>{
    
    if(data.indexOf("204") !=-1) {
    alert("Patient modified successfully")
  }

   console.log(data);
});
}

showAllergiesTable(){
  for (var i=0;i<this.allergies.length;i++){
 this.alist=new UAllergy();
 this.alist.allergyId=this.allergies[i].allergyId;
 this.alist.patientAllergyId=this.allergies[i].patientAllergyId;
 this.alist.dateCreated=this.allergies[i].dateCreated;
  if(this.allergies[i].allergyId==12345){
    this.alist.searchAllergyCode=1111;
    this.alist.searchAllergyDescription="Pollen Allergy";
  }
  if(this.allergies[i].allergyId==23456){
    this.alist.searchAllergyCode=2222;
    this.alist.searchAllergyDescription="Peanut Allergy";
  }
  if(this.allergies[i].allergyId==34567){
    this.alist.searchAllergyCode=3333;
    this.alist.searchAllergyDescription="Seasonal Allergy";
  }
  this.allList.push(this.alist);
}
}
  
  

statusButton(){
  console.log(this.currentPatient.status);
  if(this.currentPatient.status!="Activated"){
    this.activate=true;
    this.deactivate=false;
  }else{
    this.activate=false;
    this.deactivate=true;
  }
}
fetchAllergy(id:number):void{
  this.patientService.getAllergy(id).subscribe((data)=>{this.currentAllergy=data;this.addAllergy.allergyId=this.currentAllergy.allergyId;
    for (var i=0;i<this.allergies.length;i++ ){
      if(this.allergies[i].allergyId==this.addAllergy.allergyId){
        alert("allergy already exists");
        this.showadd=false;
      }else{
        this.showadd=true;
      }
    }},
    err=>{this.errorMsg=<any>err;console.log("error= "+this.errorMsg);if(this.errorMsg!=null){
      alert(id+" is not an allergy code");
    };}
  );
}
createPatientAllergy(){
 
  console.log(this.addAllergy.allergyId+this.addAllergy.patientId);
  this.patientService.addPatientAllergy(this.addAllergy).subscribe((data)=>{console.log(data);this.fetchPatient(this.addAllergy.patientId);});
}

removePatientAllergy(delall:UAllergy){
  this.patientService.deletePatientAllergy(delall.patientAllergyId).subscribe((data)=> {console.log(data);
    this.fetchPatient(this.addAllergy.patientId);
});

}
  }



  