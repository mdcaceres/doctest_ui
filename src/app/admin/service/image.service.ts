import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  updateImg(id: string, img: FormData) {
    return this.http.put<Project>(`${environment.apiUrl}/project/${id}/img`, img, {withCredentials: true})
  }
}
