import { Router } from 'aurelia-router';
import { Applicant } from './applicant';
import { ApplicantService } from './../services/applicant-service';
import { inject, bindable } from 'aurelia-framework';
import * as toastr from 'toastr';
  

@inject(ApplicantService, Router)
export class ApplicantCreate {
    private _applicantService;
    public _router;

    @bindable()
    public applicant;

    constructor(applicantService: ApplicantService, router:Router) {
        this._applicantService = applicantService;
        this._router = router;
        this.applicant = new Applicant();
    }

    activate(params) {
        if(params.id){
            this._applicantService.getOneApplicant(params.id).then(res=>{
                this.applicant = res;
            });
        }
      }

      createNew() {
        let applicant = JSON.parse(JSON.stringify(this.applicant));
        this._applicantService.createApplicant(applicant)
            .then(response => {
                toastr.success('Created Successfully');
                this._router.navigateToRoute('applicants');
            }).catch(err => 
                {
                    console.log(err);
                    toastr.error('Something went wrong');
                });
    }

    update(){
        let applicant = JSON.parse(JSON.stringify(this.applicant));
        this._applicantService.updateApplicant(applicant)
            .then(response => {
                toastr.success('Created Successfully');
                this._router.navigateToRoute('applicants');
            }).catch(err => 
                {
                    console.log(err);
                    toastr.error('Something went wrong');
                });
    }

    save(){
        this.applicant.age =  Number(this.applicant.age);
        if(this.applicant.id>0){
            this.update();
        }
        else{
            this.createNew();
        }
    }


    
}

