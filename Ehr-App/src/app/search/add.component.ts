
import {Location} from '@angular/common';
import { Component } from "@angular/core";
import { IPatient } from "./IPatient";
import { IAllergy } from "./IAllergy";
import { PatientService } from './patient.service';
import { IAllergies } from './IAllergies';
import { addAllergies } from './addAllergies';
import { allergyList } from './allergyList';

@Component({
    
      templateUrl : './add.component.html',
      providers:[PatientService]
  })
  
  
  export class AddComponent{
    patGender:String[]=['male','female'];
    patMethod:String[]=['email','homePhone','cellPhone'];
    activate=true;
    deactivate=false;
    showAllergies=false;
    private key:String;
    private event: KeyboardEvent;
    searchAllergyCode:number;
    searchAllergyDescription:string
    addallergy: addAllergies;
    showadd=true;
    errorMsg:String;
    currentPatient:IPatient= {
      
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
            dateCreated: ""
        }]
      }
    
      currentAllergy: IAllergies={
        
        allergyCode:null,
        allergyDescription: "",
        allergyId: null
      }
    allergies: addAllergies[]=[];
    allList:allergyList[]=[];
    alist:allergyList;
   
      constructor(private _location: Location,private patientService: PatientService){ }
      goback(){
          this._location.back();
      }
  save(){
    
    this.createPatient();
    debugger
    console.log(this.currentPatient.firstName);
    console.log(this.currentPatient.lastName);
    console.log(this.currentPatient.middleName);
    console.log(this.currentPatient.dob);
    console.log(this.currentPatient.gender);
    console.log(this.currentPatient.address.street);
    console.log(this.currentPatient.address.city);
    console.log(this.currentPatient.address.state);
    console.log(this.currentPatient.address.zipCode);
    console.log(this.currentPatient.contactInfo.email);
    console.log(this.currentPatient.contactInfo.homePhone);
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
        for (var i=0;i<this.allList.length;i++ ){
          console.log(this.allList[i].allergyCode+"......"+this.currentAllergy.allergyCode);
           if(this.allList[i].allergyCode==this.currentAllergy.allergyCode){
            alert("allergy already exists");
            this.showadd=false;
          }else{
          this.showadd=true;
          }
  
}
  this.fetchAllergy(this.currentAllergy.allergyCode);
  

}
private onKeyPress(event: KeyboardEvent): void {
  this.key = event.key;
  if(this.key=="Enter"){
    this.searchAllergy();
  }
}
fetchAllergy(id:number):void{
  this.patientService.getAllergy(id).subscribe(
    data=>{this.currentAllergy=data;this.searchAllergyDescription=this.currentAllergy.allergyDescription;
      this.searchAllergyCode=this.currentAllergy.allergyCode;},
err=>{this.errorMsg=<any>err;console.log("error= "+this.errorMsg);if(this.errorMsg!=null){
  alert(id+" is not an allergy code");
};});
{
 };
 
}
 addAll(){
   console.log(this.currentAllergy.allergyId);
   debugger
   /*this.addallergy= new addAllergies();
   this.addallergy.allergyId = this.currentAllergy.allergyId;
   this.allergies.push(this.addallergy);*/
  

   this.alist=new allergyList();
   this.alist.allergyCode=this.searchAllergyCode;
   this.alist.allergyDescription=this.searchAllergyDescription;
   this.alist.allergyId=this.currentAllergy.allergyId;
   this.allList.push(this.alist);
   this.patAllergies();
 }
 removeAllergies(patall :allergyList){
  for(var i = this.allList.length - 1; i >= 0; i--) {
    if(this.allList[i] ===patall) {
      this.allList.splice(i, 1);
     
    }
}
 }
 save1(){
   debugger
  for(var i = 0;i<this.allList.length; i++) {
    this.currentPatient.patAll[i].allergyId=this.allList[i].allergyId;
  }
  alert("PatientAllergies added successfully")
 }
reset(){
  this.currentAllergy.allergyDescription="";
  this.currentAllergy.allergyCode=null;
}
patAllergies(){
  if(this.allList && this.allList.length){
this.showAllergies=true;
  }
  else{
    this.showAllergies=false;
  }
}
createPatient(){
  debugger
  console.log(this.currentPatient);
  this.patientService.addPatient(this.currentPatient).subscribe((data)=>
  {
    
    if(data.indexOf("200") !=-1) {
    alert("Patient created successfully");
  }
  console.log(data);
},
err=>{this.errorMsg=<any>err;console.log("error= "+this.errorMsg);if(this.errorMsg!=null){
  alert(" duplicate Patient Record");};}

);
}
  }
  