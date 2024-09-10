const prefixPluginTranslations = (trad, pluginId) => {
  if (!pluginId) {
    throw new TypeError("pluginId can't be empty");
  }

  if (typeof trad !== 'object' || trad === null) {
    throw new TypeError('trad must be a non-null object');
  }

  return Object.keys(trad).reduce((acc, current) => {
    acc[`${pluginId}.${current}`] = trad[current];
    return acc;
  }, {});
};

export { prefixPluginTranslations };
