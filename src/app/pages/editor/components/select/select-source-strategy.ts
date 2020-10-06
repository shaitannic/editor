import { InjectionToken, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { STORE_SUBJECT, ControlEventType, ControlCustomEvent } from '../../../../utils';
import { ApiService } from '../../../../api/api.service';
import { filter, switchMap } from 'rxjs/operators';
import { IOption } from './select.component';

export const SELECT_SOURCE_STRATEGY = new InjectionToken<SelectSourceStrategy>('SELECT_SOURCE_STRATEGY');

export interface SelectSourceStrategy {
  optionsChanged: Subject<any[]>;
}

export class SelectSource1Strategy implements SelectSourceStrategy {
  private apiService: ApiService;
  private store: Subject<ControlCustomEvent>;

  constructor(injector: Injector) {
    this.apiService = injector.get(ApiService);
    /**
     * Store можно использовать как шину событий
     */
    this.store = injector.get(STORE_SUBJECT);

    const options: IOption[] = [
      {
        value: '1',
        name: '1'
      },
      {
        value: '2',
        name: '2'
      },
      {
        value: '3',
        name: '3'
      }
    ];

    this.optionsChanged.next(options);
  }

  optionsChanged: Subject<IOption[]> = new Subject();
}

export class SelectSource2Strategy implements SelectSourceStrategy {
  private apiService: ApiService;
  private store: Subject<ControlCustomEvent>;

  constructor(injector: Injector) {
    this.apiService = injector.get(ApiService);
    this.store = injector.get(STORE_SUBJECT);
    this.initHandlers();
  }

  optionsChanged: Subject<IOption[]> = new Subject();

  initHandlers() {
    this.store
      .pipe(
        filter(event => event.type === ControlEventType.DATE_CHANGED),
        switchMap(() => this.apiService.loadData()),
      )
      .subscribe(options => {
        this.optionsChanged.next(options);
      });
  }
}
