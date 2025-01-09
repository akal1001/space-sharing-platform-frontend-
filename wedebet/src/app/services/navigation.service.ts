import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from '../DataServices/data.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private previousUrl: string | null = null;
  private currentUrl: string | null = null;

  constructor(private router: Router, private dataservice:DataService) {
    this.currentUrl = this.router.url;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.urlAfterRedirects;
      }
    });
  }

  getPreviousUrl(): string | null {
    return this.previousUrl;
  }

  getCurrentUrl(): string | null {
    return this.currentUrl;
  }

  _navTo(data: any, targetRoute: string) {

    this.dataservice.setData(data);
    this.dataservice.navTo(targetRoute);
  }
}
