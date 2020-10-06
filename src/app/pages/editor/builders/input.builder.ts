import { Injector } from '@angular/core';
import { InputComponentNode } from '../components';
import { BaseBuilder } from './builder';

/**
 * Строитель. Отвечает за конфигурирование компонента-обертки input
 * Основная задача строителя - создавать разные представления компонента-обертки input
 */
export class InputBuilder<T> extends BaseBuilder<T> {
  constructor(protected component: InputComponentNode<T>) {
    super(component);
  }
}

/**
 * Директор.
 * Знает, в какой последовательности нужно заставлять работать строителя
 * чтобы получить ту или иную версию продукта (компонента-обертки select).
 */
export class InputDirector<T> {
  constructor(private injector: Injector) {}

  /**
   * Данный метод выступает в качестве примера.
   * Если в приложении необходимо реализовать Input с поведением, отличным от стандартного, то
   * логика настройки билдера должна содержаться в данном методе
   */
  constructSpecificInput(builder: InputBuilder<T>) {
    // builder.setStrategy(...)
    // builder.setStrategy2(...)
  }
}
