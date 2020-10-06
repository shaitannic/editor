import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { UIKitModule } from '../../ui-kit/ui-kit.module';

@NgModule({
  declarations: [
    MenuItemComponent,
    MenuListComponent,
  ],
  exports: [
    MenuItemComponent,
    MenuListComponent,
  ],
  imports: [
    BrowserModule,
    UIKitModule,
  ]
})
export class MenuModule { }
