import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  priorities: any[] = [{name: "High", id:1},{name: "Medium", id:2},{name: "Low", id:3}];
  constructor() { }

  getPriorities() {
    return this.priorities;
  }
  
}
