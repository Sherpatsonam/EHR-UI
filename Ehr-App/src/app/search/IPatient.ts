export interface IPatient{
    id: number;
    firstName: string;
    middleName: string;
    lastName:string;
    gender:string;
    dob:string;
    status:string;
    dateCreated:string;
    dateModified:string;
    patientCode: string;
    address:{street:string,city:string,state:string,zipCode:number};
    contactInfo:{email:string,homePhone:number,cellPhone:number,method:string};
    patAll: [{
        patientAllergyId: number;
        allergyId: number;
        patientId: number;
        dateCreated: string;
    }]
    
    
}