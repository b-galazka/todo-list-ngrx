import { NgModule } from '@angular/core';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { reducer } from './store.reducer';
import { TasksEffects } from './tasks/tasks.effects';
import { environment } from 'src/environments/environment';

const metaReducers = environment.production ? [] : [storeFreeze];

@NgModule({
  imports: [
    NgrxStoreModule.forRoot(reducer, { metaReducers }),
    EffectsModule.forRoot([TasksEffects]),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ]
})
export class StoreModule { }
