
import { Applicant } from './applicant';
import { ApplicantService } from './../services/applicant-service';
import { inject, bindable } from 'aurelia-framework';
import {EventAggregator} from "aurelia-event-aggregator";
import { ValidationControllerFactory, ValidationRules, Validator, validateTrigger, ValidationController } from 'aurelia-validation';
import {BootstrapFormRenderer} from './bootstrap-form-renderer';

@inject(EventAggregator, ApplicantService, ValidationControllerFactory, Validator)
export class ApplicantCreate {
    private _applicantService;
    private _ea;
    private _validator;
    public controller;
    @bindable()
    applicant : Applicant = new Applicant();

    constructor(ea: EventAggregator, applicantService: ApplicantService, validator : Validator, controllerFactory:ValidationControllerFactory) {
        this._applicantService = applicantService;
        this._ea = ea;
        this._validator = validator;
      //  this.controller = controllerFactory.createForCurrentScope();
        // this.controller = controllerFactory.createForCurrentScope();
        // this.controller.validateTrigger = validateTrigger.changeOrBlur;
        ValidationRules
        .ensure('name').required().minLength(5).withMessage('Name is required')
        .ensure('familyName').required().minLength(5).withMessage('Family Name is required')
        .ensure('address').required().minLength(10).withMessage('Address is required')
        .ensure('countryOfOrigin').required().withMessage('Country is required')
        .ensure('age').required().withMessage('Age is required')
        .ensure('email').required().email().withMessage('Name is required')
          .on(this.applicant);
    }

    validate() {
        this.controller.Validator(this.applicant).then(a=>{
            console.log(a);
        });
        this._validator.validateObject(this.applicant).then(results => {
            let valid = true;
            // results is an array of validation results. Each result has a
            // valid property set to true if the rule is valid.
            for (let result of results) {
                valid = valid && result.valid;
            }
            console.log(valid);
        });
    }

    activate(params) {
        if(params.id){
            this._applicantService.getOneApplicant(params.id).then(res=>{
                this.applicant = res;
            });
        }
      }
    // public bind() {
    
    //     ValidationRules
    //     .ensure('name').required().minLength(5).withMessage('Name is required')
    //     .ensure('familyName').required().minLength(5).withMessage('Family Name is required')
    //     .ensure('address').required().minLength(10).withMessage('Address is required')
    //     .ensure('countryOfOrigin').required().withMessage('Country is required')
    //     .ensure('age').required().withMessage('Age is required')
    //     .ensure('email').required().withMessage('Name is required')
    //       .on(this.applicant);
    //   }

    create() {
        let applicant = JSON.parse(JSON.stringify(this.applicant));
        this._applicantService.createApplicant(applicant)
            .then(response => {
                console.log(response);
            }).catch(err => console.log(err));
    }

    update(){
        let applicant = JSON.parse(JSON.stringify(this.applicant));
        this._applicantService.updateApplicant(applicant)
            .then(response => {
                console.log(response);
            }).catch(err => console.log(err));
    }


    save(){
        this.applicant.age =  Number(this.applicant.age);
        console.log("save",this.applicant);
       // this.validate();
        console.log(this.applicant);
        if(this.applicant.id>0){
           
            this.update();
        }
        else{
            this.create();
        }
    }
}


// import { Applicant } from './applicant';
// import { ApplicantService } from './../services/applicant-service';
// import {EventAggregator} from "aurelia-event-aggregator";
// import {inject} from 'aurelia-dependency-injection';
// import {BindingEngine} from "aurelia-framework";

// import {
//   ValidationControllerFactory,
//   ValidationController,
//   ValidationRules
//   //, validateTrigger
// } from 'aurelia-validation';
// import {BootstrapFormRenderer} from './bootstrap-form-renderer';

// @inject(ValidationControllerFactory, BindingEngine)
// export class case2 {
//   controller = null;
//   applicant : {"name": '', "familyName":''};
//   rules;

//   constructor(controllerFactory,  bindingEngine ) {
    
//     this.controller = controllerFactory.createForCurrentScope();
//     this.controller.addRenderer(new BootstrapFormRenderer());

//     this.controller.validateTrigger = 1; // validateTrigger.blur; 

//     this.rules = ValidationRules
//         .ensure("applicant.name")      
//             .displayName("Name")   
//             .required()
//         .ensure("familyName")      
//             .displayName("Family Name")   
//             .required()         
//         .ensure("email")
//             .displayName("Email")   
//             .required()         
//             .email()
//             .ensure("address")
//             .displayName("Address")   
//             .required()         
//             .ensure("countryOfOrigin")
//             .displayName("Country")   
//             .required()
//             .ensure("age")
//             .displayName("Age")   
//             .required()
//             .ensure("address")
//             .displayName("Address")   
//             .required()         
//         .ensureObject()
//             .satisfies((value, applicant) => {
//                 return (!applicant["name"]);
//             })
//             .withMessage("required is")
//         .rules;

//       this.controller.addObject(this.applicant, this.rules);
//   }
  
//   submitInstance() {
//         try {
//             this.controller.validate({ object: this.applicant })
//                 .then((errors) => {
//                     console.log(errors);
//                 });
//         } catch (ex) {
//             console.log(ex);
//         }
//     }
// }