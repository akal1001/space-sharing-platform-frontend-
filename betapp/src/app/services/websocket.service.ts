import { Injectable } from '@angular/core';
 import {websocket} from 'websocket'
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private web:websocket;
  constructor() { }
}
