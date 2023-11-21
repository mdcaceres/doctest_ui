import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../interfaces/post';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http : HttpClient) { }

  create(p:Post){
    return this.http.post<Post>(`${environment.apiUrl}/project/${p.project_id}/bug`, p, { withCredentials: true })
  }

  getAll(id:string) {
    return this.http.get<Post[]>(`${environment.apiUrl}/post/project/${id}`, {withCredentials: true})
  }


}
