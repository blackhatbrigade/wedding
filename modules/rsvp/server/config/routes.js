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
    route: '/rsvps/search',
    type: 'GET',
    method: 'search',
    secure: true
  }
];
