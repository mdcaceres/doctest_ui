import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  create(project:Project) {
    return this.http.post<Project>(`${environment.apiUrl}/projects`, project, {withCredentials: true})
  }

  getAll() {
    return this.http.get<Project[]>(`${environment.apiUrl}/projects`, {withCredentials: true})
  }
}
