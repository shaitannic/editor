import { InjectionToken, Provider } from '@angular/core';
import { Subject } from 'rxjs';

export enum ControlEventType {
  SELECT_CHANGED,
  INPUT_CHANGED,
  DATE_CHANGED,
}

export interface ControlCustomEvent {
  control: any;
  type: ControlEventType;
}

/**
 * Subject, через который будут проходить все события
 */
export const STORE_SUBJECT = new InjectionToken<Subject<ControlCustomEvent>>('Store');

export function STORE_SUBJECT_PROVIDER_FACTORY(): Subject<ControlCustomEvent> {
  return new Subject<ControlCustomEvent>();
}

export const STORE_SUBJECT_PROVIDER: Provider = {
  provide: STORE_SUBJECT,
  useFactory: STORE_SUBJECT_PROVIDER_FACTORY,
};
