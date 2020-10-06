import { InjectionToken, Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ControlCustomEvent, ControlEventType, STORE_SUBJECT } from '../../../utils';

export interface DisableStrategy {
  disableChanged: Subject<boolean>;
}

export const DISABLE_STRATEGY = new InjectionToken<DisableStrategy>('DISABLE_STRATEGY');

@Injectable()
export class DisableCustomStrategy implements DisableStrategy {
  disableChanged: Subject<boolean> = new Subject();

  private store: Subject<ControlCustomEvent>;

  constructor(injector: Injector) {
    this.store = injector.get(STORE_SUBJECT);
    this.initHandlers();
  }

  initHandlers() {
    // TODO заменить на настоящую реализацию
    this.store.pipe(filter(event => event.type === ControlEventType.INPUT_CHANGED)).subscribe(options => {
      this.disableChanged.next(true);
    });
  }
}
