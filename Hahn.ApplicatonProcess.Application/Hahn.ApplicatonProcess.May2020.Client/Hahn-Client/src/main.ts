import {Aurelia} from 'aurelia-framework';
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import {I18N, TCustomAttribute} from 'aurelia-i18n'; 
import Backend from 'i18next-xhr-backend'; 


export function configure(aurelia: Aurelia) {


  

  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  

  aurelia.use
      .standardConfiguration()
      .developmentLogging()
      .plugin(PLATFORM.moduleName('aurelia-dialog'));
      
  aurelia.use
  .standardConfiguration()
  .plugin(PLATFORM.moduleName('aurelia-validation'))
  .developmentLogging();



aurelia.use.plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => { // <------------ 3
    let aliases = ['t', 'i18n']; // <------------ 4
    TCustomAttribute.configureAliases(aliases);
    instance.i18next.use(Backend); // <------------ 5
    return instance.setup({
      fallbackLng: 'en', // <------------ 6
      ns: 'translation', // <------------ 8
      defaultNS: 'translation',
      fallbackNS: false,
      load:'unspecific',
      resGetPath: "__ns__-__lng__.json",
    
      attributes: aliases, // <------------ 9
      lng: 'de', // <------------ 10
      debug: true, // <------------ 11
      backend: {                                  
        loadPath: './locales/{{lng}}/{{ns}}.json',  // <------------ 12
      }
      
    });
  });







  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
  // aurelia.use
  //     .standardConfiguration()
  //     .developmentLogging()
  //     .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
  //        let aliases = ['t', 'i18n'];
  //       // // add aliases for 't' attribute
  //        TCustomAttribute.configureAliases(aliases);
  
  //       // register backend plugin
  //       instance.i18next.use(Backend.with(XHR));
  
  //       // adapt options to your needs (see http://i18next.com/docs/options/)
  //       // make sure to return the promise of the setup method, in order to guarantee proper loading
  //       return instance.setup({
  //         backend: {                                  // <-- configure backend settings
  //           loadPath: './locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
  //         },
  //         attributes: aliases,
  //         lng : 'de-DE',
  //         fallbackLng : 'en-US',
  //        // ns:['translation'],
  //         debug : true
  //       });
  //     });
}
