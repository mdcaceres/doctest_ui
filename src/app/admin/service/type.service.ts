import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  testTypes: any[] = [{name: "Regression", id:1},{name: "Acceptance", id:2}, {name: "Usability", id:3}, {name: "Integration", id:4}, {name: "Security", id:5}, {name: "Functionality", id:6}, {name: "Performance", id:7}, {name: "Usability", id:8}]; 

  bugTypes : any[] = [{name: "Command Error", id:1},{name: "Functional", id:2}, {name: "Data Type Mismatch", id:3}, {name: "Data Duplication", id:4}, {name: "Calculation Error", id:5}, {name: "Boundary Error", id:6}, {name: "Build Error", id:7}, {name: "Performance", id:8}, {name: "Security", id:9}];

  constructor() { }

  getTestTypes() {
    return this.testTypes;
  }

  getBugTypes() {
    return this.bugTypes;
  }
}
