import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../interfaces/project';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private project = new BehaviorSubject<Project>({});
  currentProject = this.project.asObservable();

  constructor(private http: HttpClient) { }

  changeProject(project: Project) {
    this.project.next(project)
  }

  create(project:Project) {
    return this.http.post<Project>(`${environment.apiUrl}/projects`, project, {withCredentials: true})
  }

  getAll() {
    return this.http.get<Project[]>(`${environment.apiUrl}/projects`, {withCredentials: true})
  }

  get(id:string) {
    return this.http.get<Project>(`${environment.apiUrl}/project/id/${id}`, {withCredentials: true})
  }
}
