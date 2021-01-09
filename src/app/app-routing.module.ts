import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MemberListComponent} from './member-list/member-list.component';
import {MemberFormComponent} from './member-form/member-form.component';
import {TeacherFormComponent} from './teacher-form/teacher-form.component';
import {TeacherListComponent} from './teacher-list/teacher-list.component';
import {PublicationFormComponent} from './publication-form/publication-form.component';
import {PublicationListComponent} from './publication-list/publication-list.component';
import {ToolFormComponent} from './tool-form/tool-form.component';
import {EventFormComponent} from './event-form/event-form.component';
import {ToolListComponent} from './tool-list/tool-list.component';
import {EventListComponent} from './event-list/event-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AttachsuptostuComponent} from './attachsuptostu/attachsuptostu.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'dashboard'
},
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  },
  {
    path: 'members',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MemberListComponent
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: MemberFormComponent
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: MemberFormComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  },
  {
    path: 'teachers',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TeacherListComponent
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: TeacherFormComponent
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: TeacherFormComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  },
  {
    path: 'publications',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PublicationListComponent
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: PublicationFormComponent
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: PublicationFormComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  },
  {
    path: 'tools',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ToolListComponent
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: ToolFormComponent
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: ToolFormComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  },
  {
    path: 'events',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EventListComponent
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: EventFormComponent
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: EventFormComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  },
  {
    path: 'member-form',
    pathMatch: 'full',
    component: MemberFormComponent
  },
  {
    path: 'tool-form',
    pathMatch: 'full',
    component: ToolFormComponent
  },
  {
    path: 'Event-form',
    pathMatch: 'full',
    component: EventFormComponent
  },
  {
    path: 'publications-form',
    pathMatch: 'full',
    component: PublicationFormComponent
  },
  {
    path: 'attachsuptostu',
    pathMatch: 'full',
    component: AttachsuptostuComponent
  },
  {
    path: 'teacher-form',
    pathMatch: 'full',
    component: TeacherFormComponent
  },
  {
    path: '**',
    redirectTo: 'members'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
