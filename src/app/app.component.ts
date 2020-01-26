import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoEvents, TranslocoService } from '@ngneat/transloco';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public areTranslationsLoaded$ = this.translocoService.events$.pipe(
    map(event => this.isTranslationsLoadingSuccess(event)),
    startWith(false)
  );

  public constructor(private readonly translocoService: TranslocoService) {}

  private isTranslationsLoadingSuccess(event: TranslocoEvents): boolean {
    return event.type === 'translationLoadSuccess';
  }
}
