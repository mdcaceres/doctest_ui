import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  add(testId: string, files:FormData){
    return this.http.post<any>(`${environment.apiUrl}/test/${testId}/files`, files, {withCredentials: true});
  }
}
