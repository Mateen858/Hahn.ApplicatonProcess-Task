import {RouterConfiguration, Router} from 'aurelia-router';
import { inject, PLATFORM } from "aurelia-framework";
import {I18N} from 'aurelia-i18n';
import * as Backend from 'i18next-xhr-backend'
@inject(I18N)
export class App {
  router: Router;
  i18n;


  constructor(i18n) {
    this.i18n = i18n;
    this.i18n
        .setLocale('de-DE')
        .then( () => {
          console.log(this.i18n.tr("Applicants List"));
          console.log("locals", this.i18n.getLocale());
      // locale is loaded
    });
  }

  public changeLocale(locale) {
    
    this.i18n.setLocale(locale);
    
  }
  configureRouter(config: RouterConfiguration, router: Router): void {
    
    config.title = 'Aurelia';
    config.map([
       { route: ['', 'home'],      moduleId:PLATFORM.moduleName('./applicant/applicantList'), title:"Applicants List" },
      // { route: 'applicants',            name: 'applicants',      moduleId: 'applicant/applicants-list', nav: true, title: 'Users' },
      { route: '/applicants',            name: 'applicants',      moduleId:PLATFORM.moduleName('./applicant/applicantlist'), title:"List" },

      { route: '/create',            name: 'create',      moduleId:PLATFORM.moduleName('./applicant/applicantCreate'), title:"Create" },

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

      // { route: 'users/:id/detail', name: 'userDetail', moduleId: 'users/detail' },
      // { route: 'files/*path',      name: 'files',      moduleId: 'files/index', nav: 0,    title: 'Files', href:'#files' }
    ]);
    this.router = router;
  }
}


