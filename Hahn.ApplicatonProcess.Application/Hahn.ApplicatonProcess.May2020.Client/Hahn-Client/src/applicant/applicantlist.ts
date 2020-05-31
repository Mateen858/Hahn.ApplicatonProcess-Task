import { ApplicantService } from '../services/applicant-service';
  import {inject} from 'aurelia-framework';
  import {I18N} from 'aurelia-i18n';
 
  
  @inject(ApplicantService, I18N)
  export class ApplicantList {
    public applicants;
    selectedId = 0;
    _i18N;
  
    constructor(private service: ApplicantService, i18N:I18N) {
      this._i18N=i18N;
     }


    getApplicants(){
        this.service.getApplicants().then(response => this.applicants = response);
        
    }


  
    created() {
      console.log("local set in application list page",this._i18N.getLocale());
      console.log(this._i18N.tr("Applicants List"));
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
  
