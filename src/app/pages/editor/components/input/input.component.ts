import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Optional,
  Inject,
  Input,
  Provider,
  forwardRef,
  OnInit,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DISABLE_STRATEGY, DisableStrategy } from '../disable-strategy';
import { BaseControl } from '../base-control';
import { ComponentNode } from '../../models/editor';

export interface InputComponentNode<T> extends ComponentNode<T> {
  // TODO добавлять сюда поведения, которые характерны для элемента input
}

export const INPUT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true,
};

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  providers: [INPUT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent<T> extends BaseControl<T> implements OnInit, InputComponentNode<T> {
  @Input() label: string;

  control: FormControl = new FormControl();

  onTouched: () => any = () => {};

  private controlValueAccessorChangeFn: (value: any) => void = () => {};

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    @Optional()
    @Inject(DISABLE_STRATEGY)
    protected disableStrategy: DisableStrategy,
  ) {
    super(changeDetectorRef, disableStrategy);
  }

  ngOnInit() {
    this.initControlValueAccessorHandlers();
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

  // ControlValueAccessor
  setDisableState(isDisabled: boolean) {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  // ComponentNode
  getValue() {
    return this.control.value;
  }

  // Пробрасывает значение вверх
  // Необходим только если компонент используется как ControlValueAccessor
  private initControlValueAccessorHandlers() {
    this.control.valueChanges.subscribe(val => {
      this.controlValueAccessorChangeFn(val);
    });
  }
}
