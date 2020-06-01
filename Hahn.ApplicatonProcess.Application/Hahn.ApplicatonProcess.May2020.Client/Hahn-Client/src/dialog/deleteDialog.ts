import { ApplicantService } from './../services/applicant-service';
import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Router } from 'aurelia-router';
import * as toastr from 'toastr';



@inject(DialogController, ApplicantService, Router)

export class Prompt {
   controller;
   answer;
   message;
   applicantId;
   _applicantService;
   _router;
   constructor(controller, applicantService: ApplicantService, router: Router) {
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


   public delteApplicant() {
      this._applicantService.deleteApplicant(this.applicantId).then(
         response => {
            toastr.success('Deleted Successfully');
            this.controller.ok();
            this._router.navigateToRoute('applicants');
        }).catch(err => 
            {
                console.log(err);
                this.controller.ok();
                toastr.error('Something went wrong');
            });
   }

}