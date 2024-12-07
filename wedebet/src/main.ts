import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

// Add provideHttpClient() to appConfig to provide HttpClient to the application
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers || [],  // Spread the existing providers if there are any
    provideHttpClient()            // Add the HttpClient provider
  ]
})
  .catch((err) => console.error(err));

