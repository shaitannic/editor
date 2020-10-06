import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../menu';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.less']
})
export class MenuListComponent implements OnInit {

  activeItem: MenuItem;

  menuItems: MenuItem[] = [
    {
      icon: 'build',
      label: 'Short Text',
      option: 1
    },
    {
      icon: 'code',
      label: 'Multiple Choice',
      option: 2
    },
    {
      icon: 'done',
      label: 'Long Text',
      option: 3
    },
    {
      icon: 'fingerprint',
      label: 'Picture Choice',
      option: 4
    },
    {
      icon: 'grade',
      label: 'Statement',
      option: 5
    },
    {
      icon: 'favorite',
      label: 'Question Group',
      option: 6
    },
    {
      icon: 'history',
      label: 'Dropdown',
      option: 7
    },
    {
      icon: 'tour',
      label: 'Yes / No',
      option: 8
    },
    {
      icon: 'trending_up',
      label: 'Email',
      option: 9
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
  }

  activateItem(item: MenuItem) {
    this.activeItem = item;
    this.router.navigate(['editor'], { queryParams: { option: this.activeItem.option }})
  }

}
