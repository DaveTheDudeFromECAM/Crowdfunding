import { Component, OnInit } from '@angular/core';

import { RestService, Project } from "../rest.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects : Project[] = [];
  project = {project_id: 0,  name: "null", info: "null", goal: 0, raised: 0 };
  percentage: number = 50;
  
 

  constructor(public rest:RestService, private router:Router) { }

  ngOnInit() {
    this.getProjects();
  }
  getProjects() {
    this.rest.getProjects().subscribe(
      (resp) => {
        console.log(resp);
        this.projects = resp;
      }
    )
    }

    add(){
      this.router.navigate(['/project-add'])
    }
    getPercentage(p: Project){
      this.percentage = p.raised/p.goal*100;
      return this.percentage;

    }
    search(){
      this.router.navigate(['/project-search'])
    }
}
