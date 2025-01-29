import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import CryptoJS from 'crypto-js';
import { Cryptokey_Config } from '../app.config';
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

  async saveDataAndEncrypted(id: string, data: any): Promise<void> {
    try {
      // Encrypt the data
      const encryptedData = this.encrypt(JSON.stringify(data), Cryptokey_Config.key);
      
      // Save the encrypted data to IndexedDB
      await this.cachedData.put({ id, data: encryptedData, timestamp: Date.now() });
  
      // Log success
      console.log('Data saved successfully');
    } catch (error) {
      // Log the error
      console.error('Error saving data to IndexedDB', error);
    }
  }
  
  

  
  async getDecriptedData(cacheid: string): Promise<CachedData | undefined> {
    try {
      const record = await this.cachedData.get(cacheid);
  
      if (record && record.data) {
        // Decrypt the data
        const decryptedData = this.decrypt(record.data, Cryptokey_Config.key);
  
        // Return the decrypted data
        return JSON.parse(decryptedData) as CachedData;
      }
  
      // If no record or data exists, return undefined
      return undefined;
    } catch (error) {
      console.error("Error decrypting data:", error);
      // Handle or log the error and return undefined
      return undefined;
    }
  }

  async getEncryptedData(key: string): Promise<CachedData | undefined> {
    try {
      const record = await this.cachedData.get(key);
  
      if (record && record.data) {
        // Return the record without decrypting the data
        return record;
      }
  
      return undefined;
    } catch (error) {
      console.error('Error retrieving encrypted data from IndexedDB', error);
      return undefined;
    }
  }
  
  

  public encrypt(plainText: string, key: string): string {
   
    const keyBytes = CryptoJS.enc.Utf8.parse(key.padEnd(32, '0').substring(0, 32));
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(plainText, keyBytes, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const result = iv.concat(encrypted.ciphertext);
    return CryptoJS.enc.Base64.stringify(result);
  }

  private decrypt(cipherText: string, key: string): string {

    
    // Convert the Base64 string back to a WordArray
    const cipherWordArray = CryptoJS.enc.Base64.parse(cipherText);
  
    // Extract the IV (first 16 bytes)
    const iv = CryptoJS.lib.WordArray.create(cipherWordArray.words.slice(0, 4), 16);
  
    // Extract the ciphertext (remaining bytes after IV)
    const encryptedData = CryptoJS.lib.WordArray.create(
      cipherWordArray.words.slice(4),
      cipherWordArray.sigBytes - 16
    );
  
    // Parse the key to match the format used in encryption
    const keyBytes = CryptoJS.enc.Utf8.parse(key.padEnd(32, '0').substring(0, 32));
  
    // Create a CipherParams object for decryption
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: encryptedData,
    });
  
    // Decrypt the data
    const decrypted = CryptoJS.AES.decrypt(cipherParams, keyBytes, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
  
    // Convert the decrypted WordArray back to a string
    return CryptoJS.enc.Utf8.stringify(decrypted);
  }


 
  
  






  // Add or update cached data
  async saveData1(id: string, data: any): Promise<void> {
    try {
      await this.cachedData.put({ id, data, timestamp: Date.now() });
    } catch (error) {
      console.error('Error saving data to IndexedDB', error);
    }
  }


  // Retrieve cached data
  async getData1(id: string): Promise<CachedData | undefined> {
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