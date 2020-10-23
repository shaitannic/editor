export interface ComponentNode<T> {
  getValue(): T;
  writeValue(newValue: T): void;
  setDisableState(isDisabled: boolean): void;
}
