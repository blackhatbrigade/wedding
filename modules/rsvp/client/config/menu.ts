import { MenuItem } from './../../../core/client/config/menu-item.interface';

export const RsvpMenu: Array<MenuItem> = [
  {
    "template": "RSVP",
    "state": "/rsvp",
    "position": 1,
    "roles": ["user"],
    "subitems": [
      {
        template: 'RSVP',
        state: '/rsvp',
        roles: [
          'user',
        ]
      },
      {
        template: 'Rsvps',
        state: '/rsvps',
        roles: [
          'admin'
        ]
      }
    ]
  }
]
