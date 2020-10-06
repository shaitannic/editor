import { Injector } from '@angular/core';
import { DatepickerComponentNode } from '../components';
import { BaseBuilder } from './builder';

/**
 * Строитель. Отвечает за конфигурирование компонента-обертки datepicker
 * Основная задача строителя - создавать разные представления компонента-обертки datepicker
 */
export class DatepickerBuilder<T> extends BaseBuilder<T> {
  constructor(protected component: DatepickerComponentNode<T>) {
    super(component);
  }
}

/**
 * Директор.
 * Знает, в какой последовательности нужно заставлять работать строителя
 * чтобы получить ту или иную версию продукта (компонента-обертки select).
 */
export class DatepickerDirector<T> {
  constructor(private injector: Injector) {}

  /**
   * Данный метод выступает в качестве примера.
   * Если в приложении необходимо реализовать DatePicker с поведением, отличных от стандартного, то
   * логика настройки билдера должна содержаться в данном методе
   */
  constructSpecificDatepicker(builder: DatepickerBuilder<T>) {
    // builder.setStrategy(...)
    // builder.setStrategy2(...)
  }
}
