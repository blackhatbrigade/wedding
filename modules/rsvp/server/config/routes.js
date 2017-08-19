module.exports = [
    {
    route: '/rsvp/requestrsvp',
    type: 'GET',
    method: 'requestRsvp',
    secure: true
  },
  {
    route: '/rsvp',
    type: 'POST',
    method: 'rsvp',
    secure: true
  },
  {
    route: '/rsvps',
    type: 'GET',
    method: 'readList',
    secure: true
  }

 
];
