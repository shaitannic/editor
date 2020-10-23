import { ComponentFactory, ComponentRef, Injector, ViewContainerRef } from '@angular/core';
import { Item } from '.';
import { SelectBuilder, SelectDirector } from '../builders';
import { BaseBuilder } from '../builders/builder';
import { DatepickerBuilder, DatepickerDirector } from '../builders/datepicker.builder';
import { InputBuilder, InputDirector } from '../builders/input.builder';
import { DatepickerComponent, InputComponent, SelectComponent } from '../components';
import { ComponentNode } from './component-node';

/**
 * Фабрика, отвечающая за создание компонентов оберток
 */
export class ComponentNodeFactory<T> {
  componentNode: ComponentNode<T>;

  constructor(
    container: ViewContainerRef,
    componentFactory: ComponentFactory<ComponentNode<T>>,
    private item: Item,
    private injector: Injector,
  ) {
    const componentRef: ComponentRef<ComponentNode<T>> = container.createComponent(componentFactory);
    this.componentNode = componentRef.instance;
  }

  createComponent(): ComponentNode<T> {
    let builder: BaseBuilder<T>;

    if (this.componentNode instanceof SelectComponent) {
      const director = new SelectDirector(this.injector);
      const builder = new SelectBuilder(this.componentNode);

      if (this.item.type === 1) {
        director.constructComponent1(builder);
      }

      if (this.item.type === 1) {
        director.constructComponent2(builder);
      }

      this.componentNode.writeValue(this.item.value);
      this.componentNode.setDisableState(this.item.disabled);

      return builder.getResult();
    }

    if (this.componentNode instanceof DatepickerComponent) {
      const datepickerDirector = new DatepickerDirector(this.injector);
      const builder = new DatepickerBuilder(this.componentNode);
      return builder.getResult();
    }

    if (this.componentNode instanceof InputComponent) {
      const inputDirector = new InputDirector(this.injector);
      const builder = new InputBuilder(this.componentNode);
      return builder.getResult();
    }

    return builder.getResult();
  }
}
