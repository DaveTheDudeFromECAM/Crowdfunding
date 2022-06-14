import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectComponent } from "./project/project.component";
import { ProjectAddComponent } from "./project-add/project-add.component";
import { ProjectEditComponent } from './project-edit/project-edit.component';

const routes: Routes = [
  {
    path: 'projects',
    component: ProjectComponent},

  {
    path: 'project-add',
    component: ProjectAddComponent},

  {
    path: 'project-edit/:project_id',
    component: ProjectEditComponent},
  //route par défaut
  {
    path: '',
    redirectTo: '/projects',
    pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
