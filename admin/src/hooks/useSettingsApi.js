import { useFetchClient } from '@strapi/strapi/admin';

export const useSettingsApi = () => {
  const { get, post } = useFetchClient();

  const getSettings = async () => {
    const resultData = await get('/seo/settings');

    return resultData;
  };

  const setSettings = async (data) => {
    const resultData = await post('/seo/settings', data);

    return resultData;
  };

  return { getSettings, setSettings };
};
