import { MenuItem } from './../../../core/client/config/menu-item.interface';

export const RegistryMenu: Array<MenuItem> = [
  {
    "template": "Registry",
    "state": "/registry",
    "position": 1,
    "roles": ["user"],
    "subitems": [
      {
        template: 'Create',
        state: '/registry/create',
        roles: [
          'admin'
        ]
      },
      {
        template: 'List',
        state: '/registry/list',
        roles: [
          'admin'
        ]
      }
    ]
  }
]

