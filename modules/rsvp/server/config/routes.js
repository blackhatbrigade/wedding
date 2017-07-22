module.exports = [
  {
    route: '/rsvp',
    type: 'POST',
    method: 'create',
    secure: false
  },
  {
    route: '/rsvps',
    type: 'GET',
    method: 'readList',
    secure: true
  },
  {
    route: '/rsvp/search',
    type: 'GET',
    method: 'search',
    secure: true
  }
];
