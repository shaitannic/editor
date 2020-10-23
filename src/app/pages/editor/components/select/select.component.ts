import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Optional,
  Inject,
  Provider,
  forwardRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SELECT_SOURCE_STRATEGY, SelectSourceStrategy } from './select-source-strategy';
import { DISABLE_STRATEGY, DisableStrategy } from '../disable-strategy';
import { BaseControl } from '../base-control';
import { Subject } from 'rxjs';
import { ComponentNode } from '../../models/component-node';

export interface SelectComponentNode<T> extends ComponentNode<T> {
  setSelectSourceStrategy(strategy: SelectSourceStrategy): void;
}
export interface IOption {
  value: string;
  name: string;
}

export const SELECT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true,
};

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  providers: [SELECT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T> extends BaseControl<T> implements OnInit, OnDestroy, SelectComponentNode<T> {

  control: FormControl = new FormControl();
  options: IOption[];

  private ngUnsubscribe: Subject<any> = new Subject();

  private controlValueAccessorChangeFn: (value: any) => void = () => {};
  onTouched: () => any = () => {};

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    @Optional()
    @Inject(DISABLE_STRATEGY)
    protected disableStrategy: DisableStrategy,
    @Optional()
    @Inject(SELECT_SOURCE_STRATEGY)
    public selectSourceStrategy: SelectSourceStrategy,
  ) {
    super(changeDetectorRef, disableStrategy);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // ControlValueAccessor
  setDisableState(isDisabled: boolean) {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  // Возможность вручную устанавливать механизм формирования
  // элементов выпадающего списка
  setSelectSourceStrategy(strategy: SelectSourceStrategy) {
    this.selectSourceStrategy = strategy;
  }

  // ComponentNode
  getValue() {
    return this.control.value;
  }

  // ControlValueAccessor
  writeValue(value: T) {
    this.control.setValue(value);
  }

  // ControlValueAccessor
  registerOnChange(fn: (value: any) => void) {
    this.controlValueAccessorChangeFn = fn;
  }

  // ControlValueAccessor
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
