import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestCase } from '../interfaces/testcase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(private http: HttpClient) { }

  create(testCase:TestCase){
    return this.http.post<TestCase>(`${environment.apiUrl}/project/${testCase.project_id}/test`, testCase, { withCredentials: true })
  }

  getAll(id:string) {
    return this.http.get<TestCase[]>(`${environment.apiUrl}/project/${id}/tests`, {withCredentials: true})
  }

  getById(id:string) {
    return this.http.get<TestCase[]>(`${environment.apiUrl}/test/${id}`, {withCredentials: true})
  }

}
