import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};

export const APP_CONFIG = {
//apiUrl: 'https://localhost:18874/api',


apiUrl:'https://geehfnmzog.execute-api.us-east-1.amazonaws.com/Prod/api'
 
};
export const aws_Config = {
  bucketName: 'betapp',
  region: 'us-east-1',
  aws_access_key: "AKIA4O3HLAEQCDOXZVZH",
  aws_secret_key: "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",
  s3Url: 'https://betapp.s3.amazonaws.com/',
}

export const Somee_Config = {
  apiKey:'UnJ4QeZfY1dudOC0Tt2wMJmN8/2w1piw+boeqxc0sfey7ttrZtisq/ukAiX2lfTj',
  //apiUrl: 'https://fileupload.somee.com/api/S3/Upload',
  apiUrl:'https://qqqqq.somee.com/api/s3/upload'
  //apiUrl:'https://localhost:7051/api/S3/Upload'
}


// export const API_key_Config = {
//   keyName:'X-API-KEY',
//   value:'my-secret-api-key'
// }

export const API_key_Config = {
  keyName:'x-app-tag',
  value:'wrx6tU8KyQpUTh5p4fXrFF1aPhOctU87KyQpUTh5p4fXrFF1aPhOctU8'
}

export const Cryptokey_Config = {
  key:'Fmn//nGFz234s8vsfJ2WUw=='
  
}

export const OpneAI_API_Config = {
  key:'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',
  apiUrl :'https://api.openai.com/v1/chat/completions'
}

export const Unsplash_API_Config = {
  key:'vjYtMzF4vgOKxlXOZ33iGD2nia8tC7EH7O3s39wEQUM',
  apiUrl :'https://api.unsplash.com/search/',
  apiUrlAws :'https://geehfnmzog.execute-api.us-east-1.amazonaws.com/Prod/api/unsplash',
  //apiUrlAws: 'https://localhost:18874/api/unsplash'
}






