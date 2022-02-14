/*
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState, useRef } from 'react';

import { Stack } from '@strapi/design-system/Stack';
import { Alert } from '@strapi/design-system/Alert';
import { Typography } from '@strapi/design-system/Typography';

import { LoadingIndicatorPage } from '@strapi/helper-plugin';

import { useIntl } from 'react-intl';
import { getTrad } from '../../utils';

import { fetchSeoComponent, fetchContentTypes } from '../../utils/api';

import Info from '../../components/SeoPage/Info';
import Header from '../../components/SeoPage/Header';

import { createSeoComponent } from '../../utils/api';
import { useAutoReloadOverlayBlocker } from '@strapi/helper-plugin';

const HomePage = () => {
  const { formatMessage } = useIntl();

  const { lockAppWithAutoreload, unlockAppWithAutoreload } =
    useAutoReloadOverlayBlocker();

  const [isLoading, setIsLoading] = useState(true);
  const [shouldEffect, setShouldEffect] = useState(false);

  const seoComponent = useRef({});
  const contentTypes = useRef({});

  // Fetching the SEO component & Content-Types
  useEffect(async () => {
    seoComponent.current = await fetchSeoComponent();
    contentTypes.current = await fetchContentTypes();

    if (!seoComponent.current) {
      try {
        lockAppWithAutoreload();
        await createSeoComponent();
      } catch (error) {
        console.log(error);
      } finally {
        unlockAppWithAutoreload();
        setShouldEffect(true);
      }
    }
    setIsLoading(false);
  }, [shouldEffect]);

  // Displaying the LoadingIndicatorPage while it fetches the data
  if (isLoading) {
    return <LoadingIndicatorPage />;
  }

  return (
    <>
      <Header seoComponent={seoComponent.current} />
      <Stack
        left="50%"
        marginLeft="-250px"
        position="fixed"
        size={2}
        top={`${46 / 16}rem`}
        width={`${500 / 10}rem`}
        zIndex={10}
      >
        <Alert closeLabel="Close alert" title="Notice">
          <Typography variant="omega">
            {formatMessage({
              id: getTrad('SEOPage.info.information'),
              defaultMessage:
                "When adding your SEO component, make sure to name it 'seo' and to include it in the root of your Content-Type.",
            })}
          </Typography>
        </Alert>
      </Stack>

      <Info contentTypes={contentTypes.current} />
    </>
  );
};

export default memo(HomePage);
