import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TasksComponent } from './pages/tasks/tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { tasksFeatureKey } from './store/tasks.consts';
import { tasksReducer } from './store/tasks.reducer';
import { TasksEffects } from './store/tasks.effects';
import { TasksService } from './services/tasks.service';
import { TasksFacade } from './store/tasks.facade';

@NgModule({
  declarations: [TasksComponent, TaskComponent, TaskFormComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    TasksRoutingModule,
    SharedModule,
    StoreModule.forFeature(tasksFeatureKey, tasksReducer),
    EffectsModule.forFeature([TasksEffects])
  ],
  providers: [
    TasksService,
    TasksFacade
  ]
})
export class TasksModule { }
