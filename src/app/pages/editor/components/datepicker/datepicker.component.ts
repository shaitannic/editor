import { Component, ChangeDetectorRef, forwardRef, ChangeDetectionStrategy, Optional, Inject, OnInit, Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';

import { BaseControl } from '../base-control';

import { DisableStrategy, DISABLE_STRATEGY } from '../disable-strategy';
import { ComponentNode } from '../../models/component-node';

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

@Injectable()
export class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd.MM.yyyy', this.locale);
    } else {
      return date.toDateString();
    }
  }
}

export interface DatepickerComponentNode<T> extends ComponentNode<T> {
  // TODO добавлять сюда поведения, которые характерны для элемента datepicker
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent<T extends Date> extends BaseControl<T>
  implements OnInit, DatepickerComponentNode<T> {
  startDate = new Date();
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
    super.ngOnInit();

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
