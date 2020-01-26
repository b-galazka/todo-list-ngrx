import { NgModule, Optional, SkipSelf } from '@angular/core';
import { TRANSLOCO_CONFIG, TRANSLOCO_LOADER, translocoConfig } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { config } from 'src/config';
import { environment } from 'src/environments/environment';
import { CONFIG } from './injection-tokens/config.token';
import { TranslationsLoader } from './services/translations-loader.service';

const devOnlyImports = [
  StoreDevtoolsModule.instrument({
    maxAge: 25
  })
];

@NgModule({
  imports: [
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

    EffectsModule.forRoot([]),
    ...(config.env.production ? [] : devOnlyImports)
  ],

  providers: [
    { provide: CONFIG, useValue: config },

    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en'],
        prodMode: environment.production,
        defaultLang: 'en',

        flatten: {
          aot: environment.production
        }
      })
    },

    {
      provide: TRANSLOCO_LOADER,
      useClass: TranslationsLoader
    }
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
