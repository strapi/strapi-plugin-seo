module.exports = {
  // accessible only from admin UI
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/component',
      handler: 'seo.findSeoComponent',
      config: {
        auth: false, // To Remove
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/component',
      handler: 'seo.createSeoComponent',
      config: {
        auth: false, // To Remove
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/content-types',
      handler: 'seo.findContentTypes',
      config: {
        auth: false, // To Remove
        policies: [],
      },
    },
  ],
};
