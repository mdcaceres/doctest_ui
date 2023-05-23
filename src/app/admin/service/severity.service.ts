import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeverityService {
  severities : any[] = [{name: "Critical", id:1},{name: "High", id:2},{name: "Moderate", id:3},{name: "Minor", id:4},{name: "Cosmetic", id:5}];
  constructor() { }
  getSeverities() {
    return this.severities;
  }

}
