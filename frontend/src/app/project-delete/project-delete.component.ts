import { Component, OnInit } from '@angular/core';

import { RestService, Project } from "../rest.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-project-delete',
  templateUrl: './project-delete.component.html',
  styleUrls: ['./project-delete.component.css']
})
export class ProjectDeleteComponent implements OnInit {
  project = {project_id: 0,  name: "null", info: "null", goal: 0, raised: 0 }

  constructor(public rest: RestService,private route:ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getProject(this.route.snapshot.params['project_id']).subscribe(
      (data)=>{
        console.log(data);
        console.log("data extraction sucess");
        this.project = data;
      }
    )
  }
  deleteProject() {
    this.rest.deleteProject(this.project).subscribe(
      () => {
        this.router.navigate(["/projects"]);
        console.log("delete success");
      },
      (err)=>{
        console.log(err);
      }
    )
  }
}
