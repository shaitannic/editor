import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  Injector,
  Type,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
} from '@angular/core';
import { ComponentNodeFactory } from '../../models/component.factory';
import { COMPONENTS_CONFIG } from '../../models/components.config';
import { ComponentNode } from '../../models/editor';
import { BaseWrapper } from '../wrapper';

@Component({
  selector: 'app-wrapper-row',
  templateUrl: './wrapper-row.component.html',
  styleUrls: ['./wrapper-row.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapperRowComponent<T> extends BaseWrapper<T> implements AfterViewInit {
  componentNode: ComponentNode<T>;

  @ViewChild('componentNodeContainer', { read: ViewContainerRef }) componentNodeContainer: ViewContainerRef;

  constructor(
    public injector: Injector,
    public changeDetectorRef: ChangeDetectorRef,
    public componentFactoryResolver: ComponentFactoryResolver,
  ) {
    super(changeDetectorRef);
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    const componentType: Type<ComponentNode<T>> = COMPONENTS_CONFIG[this.item.selector];
    const componentFactory: ComponentFactory<ComponentNode<T>> = this.componentFactoryResolver.resolveComponentFactory(
      componentType,
    );
    const factory = new ComponentNodeFactory(this.componentNodeContainer, componentFactory, this.item, this.injector);
    this.componentNode = factory.createComponent();
    this.changeDetectorRef.detectChanges();
  }

  getValue(): T {
    return this.componentNode.getValue();
  }
}
