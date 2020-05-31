import { Applicant } from './applicant';
import { ApplicantService } from './../services/applicant-service';
import {inject} from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator, ApplicantService)
export class ContactDetail {
    private _applicantService: ApplicantService;
    public applicant : any;


    constructor(eventAggregator, applicantService: ApplicantService) {
        this._applicantService = applicantService;
    }

    activate(params) {
        this._applicantService.getOneApplicant(params.id).then(res=>{
            this.applicant = res;
        });
      }



}