import { Type } from '@angular/core';
import { ComponentWrapperType } from '../../../api/api.service';
import { DatepickerComponent, InputComponent, SelectComponent } from '../components';
import { ComponentNode } from './editor';

/**
 * Структура данных, хранящая соответствие между
 */
export const COMPONENTS_CONFIG: Record<ComponentWrapperType, Type<ComponentNode<any>>> = {
  [ComponentWrapperType.Select]: SelectComponent,
  [ComponentWrapperType.Input]: InputComponent,
  [ComponentWrapperType.Date]: DatepickerComponent,
  [ComponentWrapperType.Header]: null,
  [ComponentWrapperType.Group]: null,
  [ComponentWrapperType.Row]: null,
};
