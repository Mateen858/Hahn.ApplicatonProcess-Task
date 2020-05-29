import {RouterConfiguration, Router} from 'aurelia-router';
import { PLATFORM } from "aurelia-framework";
  
export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    
    config.title = 'Aurelia';
    config.map([
      // { route: ['', 'home'],       name: 'home',       moduleId: 'home/index' },
      // { route: 'applicants',            name: 'applicants',      moduleId: 'applicant/applicants-list', nav: true, title: 'Users' },
      { route: '/applicants',            name: 'applicants',      moduleId:PLATFORM.moduleName('./applicant/applicantlist') },
      // { route: 'users/:id/detail', name: 'userDetail', moduleId: 'users/detail' },
      // { route: 'files/*path',      name: 'files',      moduleId: 'files/index', nav: 0,    title: 'Files', href:'#files' }
    ]);
    this.router = router;
  }
}


