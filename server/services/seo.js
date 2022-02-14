'use strict';

const _ = require('lodash');
const fetch = require('node-fetch');

const seoContent = require('../components/seo.json');
const metaSocialContent = require('../components/meta-social.json');

module.exports = ({ strapi }) => ({
  getSeoComponent() {
    const seoComponent = strapi.components['shared.seo'];
    return seoComponent
      ? { attributes: seoComponent.attributes, category: seoComponent.category }
      : null;
  },
  getContentTypes() {
    const contentTypes = strapi.contentTypes;
    const keys = Object.keys(contentTypes);
    let collectionTypes = [];
    let singleTypes = [];

    keys.forEach((name) => {
      const hasSharedSeoComponent = _.get(
        contentTypes[name],
        'attributes.seo.component',
        null
      );

      if (name.includes('api::')) {
        const object = {
          seo: hasSharedSeoComponent ? true : false,
          uid: contentTypes[name].uid,
          kind: contentTypes[name].kind,
          globalId: contentTypes[name].globalId,
          attributes: contentTypes[name].attributes,
        };
        contentTypes[name].kind === 'collectionType'
          ? collectionTypes.push(object)
          : singleTypes.push(object);
      }
    });

    return { collectionTypes, singleTypes } || null;
  },
  async createSeoComponent() {
    const seoComponent = await this.getSeoComponent();

    if (!seoComponent) {
      if (metaSocialContent && seoContent) {
        try {
          const res = await strapi
            .plugin('content-type-builder')
            .services.components.createComponent({
              component: {
                category: 'shared',
                displayName: seoContent.info.displayName,
                icon: seoContent.info.icon,
                attributes: seoContent.attributes,
              },
              components: [
                {
                  tmpUID: 'shared.meta-social',
                  category: 'shared',
                  displayName: metaSocialContent.info.displayName,
                  icon: metaSocialContent.info.icon,
                  attributes: metaSocialContent.attributes,
                },
              ],
            });
          return res;
        } catch (error) {
          console.log(error);
        }
      } else {
        return null;
      }
    }
  },
});
