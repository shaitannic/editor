import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { UIKitModule } from '../../ui-kit/ui-kit.module';
import { STORE_SUBJECT_PROVIDER } from '../../utils';
import { EditorService } from './models/editor';

import { EditorComponent } from './editor.component';

import * as wrappers from './wrappers';
import * as components from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UIKitModule
  ],
  declarations: [
    EditorComponent,
    ...wrappers.components,
    ...components.components
  ],
  entryComponents: [
    EditorComponent,
    ...wrappers.components,
    ...components.components
  ],
  providers: [
    EditorService,
    STORE_SUBJECT_PROVIDER
  ],
  exports: [
    EditorComponent
  ],
  bootstrap: [],
})
export class EditorModule {
}
