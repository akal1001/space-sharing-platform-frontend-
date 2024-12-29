import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};

export const APP_CONFIG = {
 //apiUrl: 'https://localhost:18874/api',
 apiUrl:'https://55g6g8nqy2.execute-api.us-east-1.amazonaws.com/Prod/api'
 
};
export const aws_Config = {
  bucketName: 'betapp',
  region: 'us-east-1',
  aws_access_key: "AKIA4O3HLAEQGKNC275K",
  aws_secret_key: "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",
  s3Url: 'https://betapp.s3.amazonaws.com/',
}



