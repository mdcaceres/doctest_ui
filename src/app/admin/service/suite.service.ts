import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Suite } from '../interfaces/suite';

@Injectable({
  providedIn: 'root'
})
export class SuiteService {

  constructor(private http:HttpClient) { }

  createSuite(suite:Suite){
    return this.http.post(`${environment.apiUrl}/project/${suite.project_id}/suite`,suite, {withCredentials: true});
  }

  GetAll(id:string){
    return this.http.get(`${environment.apiUrl}/project/${id}/suites`, {withCredentials: true});
  }
}
