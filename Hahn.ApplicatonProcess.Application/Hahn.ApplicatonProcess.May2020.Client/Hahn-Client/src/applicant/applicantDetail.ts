import { ApplicantService } from './../services/applicant-service';
import {inject} from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator';
import {DialogService} from 'aurelia-dialog';
import {Prompt} from '../dialog/deleteDialog';


@inject(EventAggregator, ApplicantService, DialogService)
export class ContactDetail {
    private _applicantService: ApplicantService;
    public applicant : any;
    public _dialogService;

    constructor(eventAggregator, applicantService: ApplicantService, dialogService:DialogService) {
        this._applicantService = applicantService;
        this._dialogService = dialogService;
    }

    activate(params) {
        this._applicantService.getOneApplicant(params.id).then(res=>{
            this.applicant = res;
        });
      }
public openDeleteDialog(){
    this._dialogService.open( {viewModel: Prompt, model: {'message':"Are you sure", "id": this.applicant.id} }).then(response => {
        //
     });
}
      

}