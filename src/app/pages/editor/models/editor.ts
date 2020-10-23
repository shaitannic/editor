import { ComponentFactoryResolver, Type, Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ComponentWrapperType } from '../../../api/api.service';
import { WrapperGroupComponent } from '../wrappers/wrapper-group/wrapper-group.component';
import { Wrapper } from '../wrappers/wrapper';
import { WRAPPERS_CONFIG } from './wrappers.config';
import { WrapperHeaderComponent } from '../wrappers/wrapper-header/wrapper-header.component';

export interface Item {
  selector: ComponentWrapperType;
  name: string;
  type: number;
  value?: any;
  disabled?: boolean;
  children?: Item[];
}

@Injectable()
export class EditorService<T> {
  rootViewContainerRef: ViewContainerRef;
  dataChange = new BehaviorSubject<Wrapper<T>[]>([]);

  get data(): Wrapper<T>[] {
    return this.dataChange.value;
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  initialize(items: Item[], rootViewContainerRef: ViewContainerRef) {
    this.rootViewContainerRef = rootViewContainerRef;
    this.buildTree(items, 0, rootViewContainerRef);
  }

  buildTree(items: Item[], level: number, viewContainerRef: ViewContainerRef): Wrapper<T>[] {
    return items.reduce<Wrapper<T>[]>((accumulator, item) => {
      const ComponentWrapperType: Type<Wrapper<T>> = WRAPPERS_CONFIG[item.selector];
      const wrapperFactory = this.componentFactoryResolver.resolveComponentFactory(ComponentWrapperType);
      const wrapperComponent = viewContainerRef.createComponent(wrapperFactory);
      const wrapperInstance = wrapperComponent.instance;
      wrapperInstance.setItem(item);

      if (wrapperInstance instanceof WrapperGroupComponent || wrapperInstance instanceof WrapperHeaderComponent) {
        wrapperInstance.changeDetectorRef.detectChanges();
        wrapperInstance.isInited.subscribe(() => {
          const children = this.buildTree(item.children, level + 1, wrapperInstance.childContainer);
          wrapperInstance.setChildren(children);
          wrapperInstance.changeDetectorRef.detectChanges();
        });
      }

      return accumulator.concat(wrapperInstance);
    }, []);
  }

  clear() {
    if (this.rootViewContainerRef) {
      this.rootViewContainerRef.clear();
    }
  }
}
