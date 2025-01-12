import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

export interface CachedData {
  id: string; // Unique ID (e.g., API endpoint)
  data: any;  // Cached data
  timestamp: number; // Cache timestamp
}

@Injectable({
  providedIn: 'root'
})
export class IndexeddbService extends Dexie {
  cachedData!: Table<CachedData, string>; // Table definition

  constructor() {
    super('MyDatabase'); 
    this.version(1).stores({cachedData: 'id, timestamp'}); // Index by id and timestamp
  }

  // Add or update cached data
  async saveData(id: string, data: any): Promise<void> {
    try {
      await this.cachedData.put({ id, data, timestamp: Date.now() });
    } catch (error) {
      console.error('Error saving data to IndexedDB', error);
    }
  }


  // Retrieve cached data
  async getData(id: string): Promise<CachedData | undefined> {
    return this.cachedData.get(id);
  }

  // Clear old data
  async clearOldData(threshold: number): Promise<void> {
    const now = Date.now();
    await this.cachedData.where('timestamp').below(now - threshold).delete();

  
  }
  async deleteCacheData(key: string): Promise<void> {
    try {
      const result = await this.cachedData.delete(key);
      if (result !== undefined) {
        console.log(`Cache data with key '${key}' deleted successfully.`);
      } else {
        console.log(`No data found with key '${key}' to delete.`);
      }
    } catch (error) {
      console.error('Failed to delete cache data:', error);
    }
  }
  
  

 
  
}
//   const CACHE_THRESHOLD = 24 * 60 * 60 * 1000; // 1 day in milliseconds
// await this.indexedDbService.clearOldData(CACHE_THRESHOLD);

// }