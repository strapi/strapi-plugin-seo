'use strict';

module.exports = async ({ strapi }) => {
  // Register permission actions.
  const actions = [
    {
      section: 'plugins',
      displayName: 'Access the plugin settings',
      uid: 'read',
      pluginName: 'seo',
    },
  ];
  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};
