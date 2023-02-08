module.exports = {
  // accessible only from admin UI
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/settings',
      handler: 'settings.getSettings',
      config: { auth: false, policies: [] },
    },
    {
      method: 'POST',
      path: '/settings',
      handler: 'settings.setSettings',
      config: { policies: [] },
    },
  ],
};
