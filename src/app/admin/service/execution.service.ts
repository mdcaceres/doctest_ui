import { HttpClient, HttpParams } from '@angular/common/http';
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

  getPerc(projectId: string, status: string, start:Date, end:Date) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("project_id",projectId);
    queryParams = queryParams.append("status",status);
    queryParams = queryParams.append("start",start.toISOString());
    queryParams = queryParams.append("end",end.toISOString());
    return this.http.get(environment.apiUrl + `/report/execution/avg`, {withCredentials: true, params:queryParams});
  }
}
