import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { config } from 'src/config';
import { CONFIG } from './injection-tokens/config.token';

const prodImports = [
  NgrxStoreModule.forRoot(
    {},
    {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }
  ),

  EffectsModule.forRoot([])
];

const devImports = [
  StoreDevtoolsModule.instrument({
    maxAge: 25
  })
];

@NgModule({
  imports: [prodImports, ...(config.env.production ? [] : devImports)],
  providers: [{ provide: CONFIG, useValue: config }]
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
