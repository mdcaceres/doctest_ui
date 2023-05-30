import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  bugStatus : any[] = [{name: "Assigned", id:1},{name: "Fixed", id:2},{name: "Resolved", id:3}];

  stepStatus : any[]  = [{name: "Passed", id:1},{name: "Failed", id:2},{name: "Blocked", id:3}];

  constructor() { }

  getBugStatuses() { 
    return this.bugStatus;
  }

  getStepStatuses() {
    return this.stepStatus;
  }

}
