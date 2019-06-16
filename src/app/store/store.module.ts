import { NgModule } from '@angular/core';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';

import { reducer } from './store.reducer';
import { TasksEffects } from './tasks/tasks.effects';
import { environment } from 'src/environments/environment';
import { TasksService } from './tasks/tasks.service';

@NgModule({
  imports: [
    NgrxStoreModule.forRoot(reducer, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      }
    }),

    EffectsModule.forRoot([TasksEffects]),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),

    HttpClientModule
  ],
  providers: [
    TasksService
  ]
})
export class StoreModule { }
