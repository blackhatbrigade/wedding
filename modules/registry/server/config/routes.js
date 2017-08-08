module.exports = [
  {
    route: '/registry/:registryId',
    type: 'GET',
    method: 'read',
    secure: true
  },
  {
    route: '/registry',
    type: 'GET',
    method: 'read',
    secure: true
  },
  {
    route: '/registry',
    type: 'POST',
    method: 'create',
    secure: true
  },
  {
    route: '/registry',
    type: 'PUT',
    method: 'update',
    secure: true
  },
  {
    route: '/registry/:registryId',
    type: 'DELETE',
    method: 'delete',
    secure: true
  }
];
