import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentNode } from '../../models/editor';
import { BaseWrapper, Wrapper } from '../wrapper';

@Component({
  selector: 'app-wrapper-header',
  templateUrl: './wrapper-header.component.html',
  styleUrls: ['./wrapper-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapperHeaderComponent<T extends T[]> extends BaseWrapper<T> {
  @Input() componentFactory: ComponentFactory<ComponentNode<T>>;

  @ViewChild('childContainer', { read: ViewContainerRef }) childContainer: ViewContainerRef;

  private _children: Wrapper<T>[];

  @ViewChild('componentNodeContainer', { read: ViewContainerRef }) componentNodeContainer: ViewContainerRef;

  constructor(public changeDetectorRef: ChangeDetectorRef, private componentFactoryResolver: ComponentFactoryResolver) {
    super(changeDetectorRef);
  }

  getValue() {
    return {
      name: 'header',
      children: this._children.map(el => el.getValue()),
    };
  }

  add(component: Type<Wrapper<T>>): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const childComponent = this.childContainer.createComponent(componentFactory);
    this._children.push(childComponent.instance);
  }

  remove(index: number): void {
    this.childContainer.remove(index);
  }

  getChildren(): Wrapper<T>[] {
    return this._children;
  }

  setChildren(children: Wrapper<T>[]) {
    this._children = children;
  }
}
