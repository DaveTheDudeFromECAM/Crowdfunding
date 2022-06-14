import { Injectable } from '@angular/core';

import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map } from 'rxjs/operators';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

const endpoint = "http://localhost:5000/"; //backend

export interface Project {
  project_id: number;
  name: string;
  info: string;
  goal: number;
  raised: number;
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  //observable notifié quand changement -> plus de problèmes evenements asynchrone

  getProjects(): Observable<any> {
    return this.http.get<Project>(endpoint + 'projects');
  }

  addProject(project: Project): Observable<any> {
    return this.http.post(endpoint + 'project', project)
  }

  updateProject(project:Project): Observable<any> {
    return this.http.put<Project>(endpoint + 'projects/'+ project.project_id, project )
  }

  getProject(id:number): Observable<any> {
    return this.http.get<Project>(endpoint + 'project/search/' + id);

  }
}
