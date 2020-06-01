import {RouterConfiguration, Router} from 'aurelia-router';
import { inject, PLATFORM } from "aurelia-framework";
import {I18N} from 'aurelia-i18n';

@inject(I18N)
export class App {
  router: Router;
  i18n;

  constructor(i18n) {
    this.i18n = i18n;
    this.i18n
        .setLocale('de-DE')
        .then( () => {
          //
    });
  }

  public changeLocale(locale) {
    this.i18n.setLocale(locale);
  }
  configureRouter(config: RouterConfiguration, router: Router): void {
    
    config.title = 'Aurelia';
    config.map([
       { 
         route: ['', 'home'],
          moduleId:PLATFORM.moduleName('./applicant/applicantList'), title:"Applicants List" 
      },
      {
         route: '/applicants',
         name: 'applicants',
         moduleId:PLATFORM.moduleName('./applicant/applicantlist'), 
         title:"List" 
        },
      { 
        route: '/create',
        name: 'create',
        moduleId:PLATFORM.moduleName('./applicant/applicantCreate'), title:"Create" 
      },
      {
        route: 'detail/:id',
        name: 'detail',
        moduleId: PLATFORM.moduleName('./applicant/applicantDetail'),
        title: 'Detail'
    },
    {
      route: 'edit/:id',
      name: 'edit',
      moduleId: PLATFORM.moduleName('./applicant/applicantCreate'),
      title: 'Edit'
  }
    ]);
    this.router = router;
  }
}


