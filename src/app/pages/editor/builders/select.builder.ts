import { Injector } from '@angular/core';
import { SelectComponentNode } from '../components';
import {
  SelectSource1Strategy,
  SelectSource2Strategy,
  SelectSourceStrategy,
} from '../components/select/select-source-strategy';
import { BaseBuilder } from './builder';

/**
 * Строитель. Отвечает за конфигурирование компонента-обертки select
 * Основная задача строителя - создавать разные представления компонента-обертки select
 */
export class SelectBuilder<T> extends BaseBuilder<T> {
  constructor(protected component: SelectComponentNode<T>) {
    super(component);
  }

  setSelectSourceStrategy(strategy: SelectSourceStrategy): void {
    this.component.setSelectSourceStrategy(strategy);
  }
}

/**
 * Директор.
 * Знает, в какой последовательности нужно заставлять работать строителя
 * чтобы получить ту или иную версию продукта (компонента-обертки select).
 */
export class SelectDirector<T> {
  constructor(private injector: Injector) {}

  constructComponent2(builder: SelectBuilder<T>) {
    const selectSourceStrategy = new SelectSource2Strategy(this.injector);
    builder.setSelectSourceStrategy(selectSourceStrategy);
  }

  constructComponent1(builder: SelectBuilder<T>) {
    const selectSourceStrategy = new SelectSource1Strategy(this.injector);
    builder.setSelectSourceStrategy(selectSourceStrategy);
  }
}
