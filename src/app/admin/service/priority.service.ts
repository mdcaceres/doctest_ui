import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  priorities: any[] = [{name: "Critical", id:1},{name: "High", id:2},{name: "Medium", id:3},{name: "Low", id:4}];
  constructor() { }

  getPriorities() {
    return this.priorities;
  }
  
}
