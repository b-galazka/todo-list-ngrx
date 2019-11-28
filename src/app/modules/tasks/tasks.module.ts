import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from 'src/app/shared/shared.module';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskComponent } from './components/task/task.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TasksService } from './services/tasks.service';
import { tasksFeatureKey } from './store/tasks.consts';
import { TasksEffects } from './store/tasks.effects';
import { TasksFacade } from './store/tasks.facade';
import { tasksReducer } from './store/tasks.reducer';
import { TasksRoutingModule } from './tasks-routing.module';

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
  providers: [TasksService, TasksFacade]
})
export class TasksModule {}
