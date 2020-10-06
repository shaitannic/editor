import { AfterViewInit, ChangeDetectorRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../models/editor';

export interface Wrapper<T> {
  item: Item;
  isInited: Subject<boolean>;
  setItem(item: Item): void;
  getValue(): any;
}

@Injectable()
export abstract class BaseWrapper<T> implements Wrapper<T>, AfterViewInit {
  item: Item;
  isInited: Subject<boolean> = new Subject();

  abstract getValue(): any;

  constructor(public changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.isInited.next(true);
  }

  setItem(item: Item): void {
    this.item = item;
  }
}
