import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';

const prodImports = [
  NgrxStoreModule.forRoot({}, {
    runtimeChecks: {
      strictStateImmutability: true,
      strictActionImmutability: true,
      strictStateSerializability: true,
      strictActionSerializability: true,
    }
  }),

  EffectsModule.forRoot([])
];

const devImports = [
  StoreDevtoolsModule.instrument({
    maxAge: 25
  })
];

@NgModule({
  imports: [
    prodImports,
    ...(environment.production ? [] : devImports)
  ]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule has already been loaded. Import Core modules in the AppModule only.'
      );
    }
  }
}
