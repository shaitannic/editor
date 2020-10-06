import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EMPTY, Observable, of } from 'rxjs';

import { Item } from '../pages/editor/models';

type ResponseType = 'json' | 'text';

/**
 * Доп. опции для запросов
 */
export interface RequestOptions {
  responseType: ResponseType;
}

export interface Request {
  url: string;
  options: RequestOptions;
  prepareForRequest(): any;
}

export abstract class BaseRequest implements Request {
  abstract url: string;
  abstract options: RequestOptions;
  abstract prepareForRequest(): any;
}

export enum ComponentWrapperType {
  Date,
  Input,
  Select,
  Header,
  Group,
  Row
}

const OPTIONS: Record<number, Item[]> = {
  1: [
    {
      selector: ComponentWrapperType.Header,
      name: 'Вариант формы №1',
      type: 1,
      children: [
        {
          selector: ComponentWrapperType.Date,
          name: 'Datepicker',
          type: 1
        },
        {
          selector: ComponentWrapperType.Date,
          name: 'Datepicker',
          type: 3
        },
        {
          selector: ComponentWrapperType.Group,
          name: 'Group',
          type: 1,
          children: [
            {
              selector: ComponentWrapperType.Select,
              name: 'Select',
              type: 1
            },
            {
              selector: ComponentWrapperType.Input,
              name: 'Input',
              type: 7
            },
          ],
        }
      ]
    }
  ],
  2: [
    {
      selector: ComponentWrapperType.Header,
      name: 'Линейная форма',
      type: 1,
      children: [
        {
          selector: ComponentWrapperType.Date,
          name: 'Datepicker',
          type: 1
        },
        {
          selector: ComponentWrapperType.Date,
          name: 'Datepicker',
          type: 3
        },
        {
          selector: ComponentWrapperType.Select,
          name: 'Select',
          type: 1
        },
        {
          selector: ComponentWrapperType.Input,
          name: 'Input',
          type: 7
        },
      ]
    }
  ],
  3: [
    {
      selector: ComponentWrapperType.Header,
      name: 'Все инпуты',
      type: 1,
      children: [
        {
          selector: ComponentWrapperType.Input,
          name: 'Input',
          type: 7
        },
        {
          selector: ComponentWrapperType.Input,
          name: 'Input',
          type: 7
        },
        {
          selector: ComponentWrapperType.Input,
          name: 'Input',
          type: 7
        },
        {
          selector: ComponentWrapperType.Input,
          name: 'Input',
          type: 7
        },
      ]
    }
  ],
  4: [
    {
      selector: ComponentWrapperType.Header,
      name: 'Датапикеры',
      type: 1,
      children: [
        {
          selector: ComponentWrapperType.Date,
          name: 'Datepicker',
          type: 3
        },
        {
          selector: ComponentWrapperType.Input,
          name: 'Input',
          type: 7
        },
        {
          selector: ComponentWrapperType.Date,
          name: 'Datepicker',
          type: 3
        },
        {
          selector: ComponentWrapperType.Input,
          name: 'Input',
          type: 7
        },
      ]
    }
  ],
  5: [
    {
      selector: ComponentWrapperType.Header,
      name: 'Вложенные группы',
      type: 1,
      children: [
        {
          selector: ComponentWrapperType.Group,
          name: 'Group',
          type: 3,
          children: [
            {
              selector: ComponentWrapperType.Input,
              name: 'Input',
              type: 7
            },
            {
              selector: ComponentWrapperType.Group,
              name: 'Group',
              type: 3,
              children: [
                {
                  selector: ComponentWrapperType.Input,
                  name: 'Input',
                  type: 7
                },
              ]
            }
          ]
        }
      ]
    }
  ]
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  post(request: Request): Observable<any> {
    return this.http.post(request.url, request.prepareForRequest());
  }

  get(request: Request): Observable<any> {
    return this.http.get(request.url, {
      params: request.prepareForRequest(),
      responseType: request.options.responseType as 'json',
    });
  }

  getData(option: number): Observable<Item[]> {
    const selectedOption = OPTIONS[option];

    if (selectedOption) {
      return of(selectedOption);
    } else {
      return of([]);
    }
  }

  loadData() {
    const options = [
      {
        value: 'value 1',
        name: 'name 1',
      },
      {
        value: 'value 2',
        name: 'name 2',
      },
      {
        value: 'value 3',
        name: 'name 3',
      },
    ];

    return of(options);
  }
}
