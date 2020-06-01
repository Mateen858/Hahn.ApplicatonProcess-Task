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
      this.getApplicants();
    }
  
    select(contact) {
      this.selectedId = contact.id;
      return true;
    }
  }
  
