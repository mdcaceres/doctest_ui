import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  bugStatus : any[] = [{name: "Assigned"},{name: "Fixing"},{name: "Resolved"}];

  stepStatus : any[]  = [{name: "Passed"},{name: "Failed"},{name: "Blocked"}];

  executionStatus : any[] = [{name: "Passed"},{name: "Failed"},{name: "Blocked"}, {name: "Error"}];

  constructor() { }

  getBugStatuses() { 
    return this.bugStatus;
  }

  getStepStatuses() {
    return this.stepStatus;
  }

  getExecutionStatuses() { 
    return this.executionStatus;
  }

}
