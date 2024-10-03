import { Search } from '@strapi/icons';

import pluginPkg from '../../package.json';
import { Initializer } from './components/Initializer';
import { SeoChecker } from './components/CMEditView/RightLinksCompo';
import { pluginPermissions } from './permissions';

import { pluginId } from './pluginId';
import { prefixPluginTranslations } from './utils/prefixPluginTranslations';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: Search,
      permissions: pluginPermissions.main,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: 'SEO',
      },
      Component: async () => {
        const { App } = await import('./pages/App');

        return App;
      },
    });
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },
  bootstrap(app) {
    app.getPlugin('content-manager').injectComponent('editView', 'right-links', {
      name: 'SeoChecker',
      Component: SeoChecker,
    });
  },
  async registerTrads(app) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
