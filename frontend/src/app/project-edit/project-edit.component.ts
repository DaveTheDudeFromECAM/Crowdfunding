import { Component, OnInit } from '@angular/core';

import { RestService, Project } from "../rest.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  project = {project_id: 0,  name: "null", info: "null", goal: 0, raised: 0 }

  constructor(public rest: RestService, private route:ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    this.rest.getProject(this.route.snapshot.params['project_id']).subscribe(
      (data)=>{
        console.log(data);
        this.project = data;
      }
    )
  }
  updateProject(){
    this.rest.updateProject(this.project).subscribe(
      (result)=> {
        this.router.navigate(['/projects']);
      },
      (err)=> {
        console.log(err);
      }
    )
  }

}
