import { ApplicantService } from '../services/applicant-service';
  import {inject} from 'aurelia-framework';
  
  @inject(ApplicantService)
  export class ApplicantList {
    public applicants;
    selectedId = 0;
  
    constructor(private service: ApplicantService) { }


    getApplicants(){
        this.service.getApplicants().then(response => this.applicants = response);
    }
  
    created() {
      this.getApplicants();
    // this.applicants  = [
    //     {"Id":1, "Name":"RMateen", "FamilyName":"FamilyR", "Address":"H No38", "CountryOfOrigin":"Pakistan", "Email": "a.mateen858@hotmail.com", "Age":30, "Hired":true},
    //     {"Id":2,"Name":"RMateen", "FamilyName":"FamilyR", "Address":"H No38", "CountryOfOrigin":"Pakistan", "Email": "a.mateen858@hotmail.com", "Age":30, "Hired":true},
    //     {"Id":3,"Name":"RMateen", "FamilyName":"FamilyR", "Address":"H No38", "CountryOfOrigin":"Pakistan", "Email": "a.mateen858@hotmail.com", "Age":30, "Hired":true},
    //     {"Id":4,"Name":"RMateen", "FamilyName":"FamilyR", "Address":"H No38", "CountryOfOrigin":"Pakistan", "Email": "a.mateen858@hotmail.com", "Age":30, "Hired":true}
    // ]
    }
  
    select(contact) {
      this.selectedId = contact.id;
      return true;
    }
  }
  
