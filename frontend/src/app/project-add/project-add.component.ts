import { Component, OnInit } from '@angular/core';

import { RestService, Project } from "../rest.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
  project = {project_id: 0,  name: "null", info: "null", goal: 0, raised: 0 }

  constructor(public rest: RestService, private router: Router) { }

  ngOnInit() {
  }
  addProject() {
    this.rest.addProject(this.project).subscribe(
      (result)=> this.router.navigate(['/projects'])
    )
  }
}