import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { IPatient } from "./IPatient";
import {Http,Response, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { IAllergies } from "./IAllergies";
import { IAllergy } from "./IAllergy";

@Injectable()
export class PatientService{

    private _url='http://localhost:8090/';
    private _serverError(err:any){
        console.log('server error:', err);
        if(err instanceof Response){
            return Observable.throw(err.json().error||'backened server error');
        }
        return Observable.throw(err||'backened server error');
    }
    constructor(private http:Http){
 
    } 

    getPatient(Id: number):Observable<IPatient>{
        return this.http.get(this._url+'patient/'+Id).map((response:Response)=><IPatient> response.json())
        .do((data)=>console.log(data));
    }
    updatePatient(patient:IPatient):Observable<String>{
        const header=new Headers({'Content-Type' :'Application/JSON'});
        const requestoptions=new RequestOptions({headers:header});
        return this.http.put(this._url+'patient',JSON.stringify(patient),requestoptions).map((response:Response)=>response.toString())
        .do((data)=>console.log(data));
    }

    addPatient(patient: IPatient):Observable<string>{
        const header=new Headers({'Content-Type' :'Application/JSON'});
        const requestoptions=new RequestOptions({headers:header});
        return this.http.post(this._url+'patient',JSON.stringify(patient), requestoptions).map(function(response:Response){ return response.toString();})
            .do((data)=>console.log(data))
            .catch(this._serverError);
          
        }
        //if u use SEarchPatientsReults
        /*getPatients(firstname:String, zipCode:number, gender:String, dob:String):Observable<IPatient[]>{
            return this.http.get(this._url+'patient/search?firstName='+firstname+'&zipCode='+zipCode+'&gender='+gender+'&dob='+dob).map((response:Response)=><IPatient[]> (response.json().patients))
            .do((data)=>console.log(data));
        }*/
        getPatients(firstname:String, zipCode:number, gender:String, dob:String):Observable<IPatient[]>{
            return this.http.get(this._url+'patient/search?firstName='+firstname+'&zipCode='+zipCode+'&gender='+gender+'&dob='+dob).map((response:Response)=><IPatient[]> response.json())
            .do((data)=>console.log(data))
            .catch(this._serverError);
        }
        /*getAllergy(Id: number):Observable<IAllergies>{
            return this.http.get(this._url+'patient/allergy/'+Id).map((response:Response)=><IAllergies> response.json())
            .do((data)=>console.log(data));
        }*/
        getAllergy(Id: number):Observable<IAllergies>{
            return this.http.get(this._url+'patient/allergy/'+Id).map((response:Response)=><IAllergies> response.json())
            .do((data)=>console.log(data))
            .catch(this._serverError);
        }
        addPatientAllergy(patientAllergy: IAllergy):Observable<string>{
            const header=new Headers({'Content-Type' :'Application/JSON'});
            const requestoptions=new RequestOptions({headers:header});
            return this.http.post(this._url+'patient/allergy',JSON.stringify(patientAllergy), requestoptions).map(function(response:Response){ return response.toString();})
                .do((data)=>console.log(data));
              
            }
        deletePatientAllergy(PatAllId: number):Observable<string>{
            return this.http.delete(this._url+'patient/allergy/'+PatAllId).map((response:Response)=>response.toString())
            .do((data)=>console.log(data));
       }
}