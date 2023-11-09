import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExecutionReuslt } from '../interfaces/result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

  constructor(private http: HttpClient) { }

  save(execution: ExecutionReuslt) {
    return this.http.post(environment.apiUrl + `/test/${execution.case_id}/execution`, execution, {withCredentials: true});
  }
}
