import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectComponent } from "./project/project.component";
import { ProjectAddComponent } from "./project-add/project-add.component";
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectDeleteComponent } from './project-delete/project-delete.component';
import { ProjectSearchComponent } from "./project-search/project-search.component";


const routes: Routes = [
  {
    path: 'projects',
    component: ProjectComponent},

  {
    path: 'project-add',
    component: ProjectAddComponent},

  {
    path: 'project-search',
    component: ProjectSearchComponent},

  {
    path: 'project-edit/:project_id',
    component: ProjectEditComponent},

    {
    path: 'project-delete/:project_id',
    component: ProjectDeleteComponent},


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
