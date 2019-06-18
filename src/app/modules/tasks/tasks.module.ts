import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TasksComponent } from './pages/tasks/tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TasksComponent, TaskComponent, TaskFormComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    TasksRoutingModule,
    SharedModule
  ]
})
export class TasksModule { }
