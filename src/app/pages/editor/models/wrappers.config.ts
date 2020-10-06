import { Type } from '@angular/core';

import { Wrapper } from '../wrappers/wrapper';
import { WrapperGroupComponent } from '../wrappers/wrapper-group/wrapper-group.component';
import { WrapperHeaderComponent } from '../wrappers/wrapper-header/wrapper-header.component';
import { WrapperRowComponent } from '../wrappers/wrapper-row/wrapper-row.component';
import { ComponentWrapperType } from '../../../api/api.service';

/**
 * Структура данных, хранящая соответствие между
 */
export const WRAPPERS_CONFIG: Record<ComponentWrapperType, Type<Wrapper<any>>> = {
  [ComponentWrapperType.Select]: WrapperRowComponent,
  [ComponentWrapperType.Input]: WrapperRowComponent,
  [ComponentWrapperType.Date]: WrapperRowComponent,
  [ComponentWrapperType.Group]: WrapperGroupComponent,
  [ComponentWrapperType.Header]: WrapperHeaderComponent,
  [ComponentWrapperType.Row]: WrapperRowComponent,
};
