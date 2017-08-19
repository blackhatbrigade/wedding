import { MenuItem } from './../../../core/client/config/menu-item.interface';

export const AppMenu: Array<MenuItem> = [
  {
    template: "Home",
    state: "/",
    position: 0,
    roles: ["user"],
    subitems: [ ]
  },
  {
    template: "Information",
    state: "/information",
    position: 1,
    roles: ["user"],
    subitems: [ ]
  }
];
