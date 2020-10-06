import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  Renderer2,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentNode } from '../../models/editor';
import { BaseWrapper, Wrapper } from '../wrapper';

@Component({
  selector: 'app-wrapper-group',
  templateUrl: './wrapper-group.component.html',
  styleUrls: ['./wrapper-group.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapperGroupComponent<T extends T[]> extends BaseWrapper<T> {
  @Input() componentFactory: ComponentFactory<ComponentNode<T>>;

  @ViewChild('groupContent', { read: ElementRef }) groupContentElementRef: ElementRef;
  @ViewChild('childContainer', { read: ViewContainerRef }) childContainer: ViewContainerRef;

  /**
   * Флаг, отражающий видимость содержимого группы
   * Если true - содержимое отображается
   * Если false - содержимое скрыто
   */
  isVisible: boolean = true;

  private _children: Wrapper<T>[];

  @ViewChild('componentNodeContainer', { read: ViewContainerRef }) componentNodeContainer: ViewContainerRef;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2,
  ) {
    super(changeDetectorRef);
  }

  toggle(): void {
    if (this.isVisible) {
      this.renderer.addClass(this.groupContentElementRef.nativeElement, 'hidden');
    } else {
      this.renderer.removeClass(this.groupContentElementRef.nativeElement, 'hidden');
    }

    this.isVisible = !this.isVisible;
    this.changeDetectorRef.markForCheck();
  }

  getValue() {
    return {
      name: 'group',
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
