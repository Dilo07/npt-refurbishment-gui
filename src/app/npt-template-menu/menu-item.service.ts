import { Injectable } from '@angular/core';
import { IMenuItemService, Menu } from '@npt/npt-template';

/* Roles allowed by the application */
export const ROLES = Object.freeze({
  driver: 'driver',
  installer: 'installer',
  movyon: 'movyon',
  operMovyon: 'opmovyon',
  fleetMng: 'fleet'
});

const SUBMENU_ROUTES = [];

const MENUITEMS = [
  {
    state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'home', children: [], roles: []
  }
];

@Injectable()
export class MenuItemService implements IMenuItemService {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
