import { ComponentNode } from '../models/component-node';

/**
 * Строитель. Базовый абстрактный класс, отвечающий за конфигурирование компонентов-оберток
 * Основная задача строителя - создавать разные представления компонентов-оберток
 * В данном случае абстрактный класс используется для инкапуляции общее логики всех билдеров в системе
 */
export abstract class BaseBuilder<T> {
  /**
   * Компонент-обертка, которую конфигурирует билдер
   */
  protected component: ComponentNode<T>;

  /**
   * В конструктор передаем компонент-обертку, которую будем конфигурировать
   */
  constructor(component: ComponentNode<T>) {
    this.component = component;
  }

  getResult(): ComponentNode<T> {
    return this.component;
  }
}
