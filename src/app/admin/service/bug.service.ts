import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bug } from '../interfaces/bug';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(private http : HttpClient) { }

  create(bug:Bug){
    return this.http.post<Bug>(`${environment.apiUrl}/project/${bug.project_id}/bug`, bug, { withCredentials: true })
  }

  getAll(id:string) {
    return this.http.get<Bug[]>(`${environment.apiUrl}/project/${id}/bugs`, {withCredentials: true})
  }

}
