import {Pipe,PipeTransform} from '@angular/core';
import { IPatient } from './IPatient';



@Pipe({
    name:'patientfilter' 

})

export class PatientFilter implements PipeTransform{
        transform (patientList: IPatient[], filterByname: string,filterByzip: number)

        {
            debugger
            console.log(filterByzip);
            console.log(filterByname);
            if (patientList &&patientList.length){
                return patientList.filter(list =>{
                    if (filterByname && list.firstName.toLowerCase().indexOf(filterByname.toLowerCase()) === -1){
                        return false;
                    }
                    if (filterByzip && list.address.zipCode!=filterByzip){
                           return false;              
                        


                    }
                    return true;
               })
            }
            else{
                return patientList;
            }
        }
        
        }
