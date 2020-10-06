import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../menu';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.less']
})
export class MenuItemComponent implements OnInit {

  @Input() menuItem: MenuItem;
  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
