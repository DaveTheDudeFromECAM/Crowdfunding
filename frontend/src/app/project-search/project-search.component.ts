import { Component, OnInit } from '@angular/core';

import { RestService, Project } from "../rest.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.css']
})
export class ProjectSearchComponent implements OnInit {
  project = {project_id: 0,  name: "null", info: "null", goal: 0, raised: 0 }

  constructor(public rest: RestService, private route:ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    this.rest.searchProject(this.route.snapshot.params['name']).subscribe(
      (data)=>{
        console.log(data);
        console.log("data extraction sucess");
        this.project = data;
      }
    )
  }

}
