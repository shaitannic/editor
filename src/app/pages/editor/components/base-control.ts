import { OnInit, ChangeDetectorRef, Optional, Inject, Injectable } from '@angular/core';
import { DISABLE_STRATEGY, DisableStrategy } from './disable-strategy';
import { ControlValueAccessor } from '@angular/forms';
import { ComponentNode } from '../models/component-node';
import { Item } from '../models';

@Injectable()
export abstract class BaseControl<T> implements OnInit, ComponentNode<T>, ControlValueAccessor {
  disabled = false;
  item: Item;

  abstract getValue(): T;
  abstract writeValue(newValue: T): void;
  abstract setDisableState(isDisabled: boolean): void;
  abstract registerOnChange(fn: (value: any) => void): void;
  abstract registerOnTouched(fn: any): void;

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    @Optional()
    @Inject(DISABLE_STRATEGY)
    protected disableStrategy: DisableStrategy,
  ) {}

  ngOnInit() {
    if (this.disableStrategy) {
      this.disableStrategy.disableChanged.subscribe(disabled => {
        this.setDisableState(disabled);
      });
    }
  }

  // Возможность вручную устанавливать механизм
  // задизейблинности селекта, а именно при каких условиях он должен дизейблиться и т.д.
  setDisableStrategy(strategy: DisableStrategy) {
    this.disableStrategy = strategy;
  }
}
