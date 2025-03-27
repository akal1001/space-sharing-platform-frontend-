import { Injectable } from '@angular/core';
import { APP_CONFIG, OpneAI_API_Config } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
 private apiUrl = OpneAI_API_Config.apiUrl;
 private key = OpneAI_API_Config.key;
  constructor() { }

  async getChatCompletion(message: string): Promise<any> {
    const requestBody = {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "" + message }],
      temperature: 0.7,
    };

    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.key}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}
