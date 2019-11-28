import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentLayoutComponent } from 'src/app/shared/layouts/content-layout/content-layout.component';
import { TasksComponent } from './pages/tasks/tasks.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [{ path: '', component: TasksComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
