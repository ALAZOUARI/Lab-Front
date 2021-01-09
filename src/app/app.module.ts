import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberListComponent } from './member-list/member-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from '../@root/shared.module';
import {MaterialModule} from '../@root/material/material.module';
import { MemberFormComponent } from './member-form/member-form.component';
import { LayoutComponent } from './layout/layout.component';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import { ToolListComponent } from './tool-list/tool-list.component';
import { ToolFormComponent } from './tool-form/tool-form.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventListComponent } from './event-list/event-list.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttachsuptostuComponent } from './attachsuptostu/attachsuptostu.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    MemberFormComponent,
    LayoutComponent,
    TeacherFormComponent,
    TeacherListComponent,
    ToolListComponent,
    ToolFormComponent,
    EventFormComponent,
    EventListComponent,
    PublicationListComponent,
    PublicationFormComponent,
    DashboardComponent,
    AttachsuptostuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule
  ],
  providers: [{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  bootstrap: [AppComponent]
})
export class AppModule { }
