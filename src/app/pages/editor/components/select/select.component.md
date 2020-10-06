Компонент-обертка над элементом из ui-kit

`<app-select>` предоставляет ту же функциональность, что и элемент из ui-kit `<gpp-select>`
за тем лишь исключением, что `<app-select>` адаптирован под использование в рамках
EditorService

### Формирование элементов выпадающего списка
Когда пользователь кликает на `<app-select>`, открывается выпадающий список.
Механизм того, как должен формироваться выпадающий список настраивается путем
регистрации провайдера `SELECT_SOURCE_STRATEGY` (см. dependency injection)

```
providers: [
  { provide: SELECT_SOURCE_STRATEGY, useClass: SelectCustomAction }
]
```

### Используйте с `@angular/forms`
`<app-select>` реализует интерфейс `ControlValueAccessor` и следовательно совместим
с `@angular/forms` (поддерживает реактивные формы)
