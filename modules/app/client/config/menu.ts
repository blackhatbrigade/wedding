import { MenuItem } from './../../../core/client/config/menu-item.interface';

export const AppMenu: Array<MenuItem> = [
  {
    template: "Home",
    state: "/",
    position: 0,
    roles: ["user"],
    subitems: [ ]
  }
];
