module.exports = {
  // accessible only from admin UI
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/component',
      handler: 'seo.findSeoComponent',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/component',
      handler: 'seo.createSeoComponent',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/content-types',
      handler: 'seo.findContentTypes',
      config: {
        policies: [],
      },
    },
  ],
};
