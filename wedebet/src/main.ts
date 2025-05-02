import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiKeyInterceptorService } from './app/services/api-key-interceptor.service';

// Add provideHttpClient() to appConfig to provide HttpClient to the application
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers || [],  // Spread the existing providers if there are any
    provideHttpClient(),            // Add the HttpClient provide
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptorService, multi: true } // Register the interceptor
        // Add the HttpClient provider
  ]
})
  .catch((err) => console.error(err));

  //to ingnor console.log() 
  //console.log = () => {};
