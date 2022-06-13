import { Injectable } from '@angular/core';

import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable, throwError } from "rxjs";
import { map } from 'rxjs/operators';

const endpoint = "http://localhost:5000/"; //backend

export interface Project{
  project_id : string;
  proj_name:string;
  proj_info:string;
  proj_goal:number;
  proj_raised:number;
  updated:Date;
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient ) {}
    //observable notifié quand changement -> plus de problèmes asynchrone
    getProjects(): Observable<any> {
      return this.http.get<Project>(endpoint + 'products');
    }
   }
