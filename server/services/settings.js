'use strict';

module.exports = ({ strapi }) => {
  const getPluginStore = () => {
    return strapi.store({
      environment: '',
      type: 'plugin',
      name: 'seo',
    });
  };

  // Create default settings
  const createDefaultConfig = async () => {
    const pluginStore = getPluginStore();

    const newContentTypes = {};

    const keys = Object.keys(strapi.contentTypes);
    keys.map((key) => {
      if (key.includes('api::')) {
        newContentTypes[key] = {};
        newContentTypes[key]['collectionName'] = key.split('.').pop();
        newContentTypes[key]['seoChecks'] = {
          metaTitle: true,
          metaDescription: true,
          metaRobots: true,
          metaSocial: true,
          wordCount: true,
          canonicalUrl: true,
          keywordDensity: true,
          structuredData: true,
          alternativeText: true,
          lastUpdatedAt: true,
        };
      }
    });

    const value = newContentTypes;

    await pluginStore.set({ key: 'settings', value });
    return pluginStore.get({ key: 'settings' });
  };
  const createConfigFromData = async (settings) => {
    const value = settings;
    const pluginStore = getPluginStore();
    await pluginStore.set({ key: 'settings', value });
    return pluginStore.get({ key: 'settings' });
  };
  const getSettings = async () => {
    const pluginStore = getPluginStore();

    let config = await pluginStore.get({ key: 'settings' });
    if (!config) {
      config = await createDefaultConfig();
    }
    return config;
  };
  const setSettings = async (data) => {
    return createConfigFromData(data);
  };
  return {
    getSettings,
    setSettings,
  };
};
