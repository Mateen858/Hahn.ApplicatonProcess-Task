import { ApplicantService } from './../services/applicant-service';
import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import { Router } from 'aurelia-router';



@inject(DialogController, ApplicantService, Router)

export class Prompt {
    controller;
    answer;
    message;
    applicantId;
    _applicantService;
    _router;
   constructor(controller, applicantService:ApplicantService,  router:Router) {
      this.controller = controller;
      this.answer = null;
      this._applicantService = applicantService;
      this._router = router;


      controller.settings.centerHorizontalOnly = true;
   }
   activate(params) {
      this.message = params.message;
      this.applicantId = Number(params.id);
   }


   public delteApplicant(){
       console.log("delte applicant called");
this._applicantService.deleteApplicant(this.applicantId).then(res=>{
    this.controller.ok();
    this._router.navigateToRoute('applicants');
    console.log(res);
});
   }

}