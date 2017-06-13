module.exports = [
  {
    route: '/gallery/:galleryId',
    type: 'GET',
    method: 'read',
    secure: true
  },
  {
    route: '/gallery',
    type: 'POST',
    method: 'create',
    secure: true
  },
  {
    route: '/gallery',
    type: 'PUT',
    method: 'update',
    secure: true
  },
  {
    route: '/gallery/:galleryId',
    type: 'DELETE',
    method: 'delete',
    secure: true
  }
];
