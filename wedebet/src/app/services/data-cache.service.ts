import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataCacheService {

  private cache: any = null; // Stores the cached data

  // Set data in cache
  setCache(data: any): void {
    this.cache = data;
  }

  // Get data from cache
  getCache(): any {
    return this.cache;
  }



  private pageCache: number | null = null; // Stores current page number
  private dataCache: any = null;  // Stores page data

  // Store the current page number
  setPageNumber(pageNumber: number): void {
    this.pageCache = pageNumber;
  }

  // Get the current page number from cache
  getPageNumber(): number | null {
    return this.pageCache;
  }

  // Clear cached data
  clearCache(): void {
    this.cache = null;
    
  }
}
