'use strict';

module.exports = {
  findSeoComponent(ctx) {
    ctx.body = strapi.plugin('seo').service('seo').getSeoComponent();
  },
  findContentTypes(ctx) {
    ctx.body = strapi.plugin('seo').service('seo').getContentTypes();
  },
  async createSeoComponent(ctx) {
    strapi.reload.isWatching = false;

    try {
      const data = await strapi
        .plugin('seo')
        .service('seo')
        .createSeoComponent();
      if (data) setImmediate(() => strapi.reload());
      ctx.body = data;
    } catch (error) {
      console.log(error);
    }
  },
};
