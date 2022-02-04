/*
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState } from 'react';

import { Stack } from '@strapi/design-system/Stack';
import { Alert } from '@strapi/design-system/Alert';
import { Typography } from '@strapi/design-system/Typography';

import { LoadingIndicatorPage } from '@strapi/helper-plugin';

import EmptyComponentLayout from '../../components/SeoPage/Info/EmptyComponentLayout';

import Info from '../../components/SeoPage/Info';
import Header from '../../components/SeoPage/Header';

import { useIntl } from 'react-intl';
import { getTrad } from '../../utils';

import { fetchSeoComponent, fetchContentTypes } from '../../utils/api';

const HomePage = () => {
  const { formatMessage } = useIntl();

  const [isLoading, setIsLoading] = useState(true);
  const [contentTypes, setContentTypes] = useState(null);
  const [seoComponent, setSeoComponent] = useState(null);
  const [shouldEffect, setShouldEffect] = useState(false);

  // Fetching the SEO component & Content-Types
  useEffect(async () => {
    setSeoComponent(await fetchSeoComponent());
    setContentTypes(await fetchContentTypes());
    setIsLoading(false);
  }, [shouldEffect]);

  // Displaying the LoadingIndicatorPage while it fetches the data
  if (isLoading) {
    return <LoadingIndicatorPage />;
  }

  // No SEO component => Return x component
  if (!seoComponent) {
    return (
      <>
        <Header seoComponent={seoComponent} />
        <EmptyComponentLayout setShouldEffect={setShouldEffect} />
      </>
    );
  }

  return (
    <>
      <Header seoComponent={seoComponent} />
      <Stack
        left="50%"
        marginLeft="-250px"
        position="fixed"
        size={2}
        top={`${46 / 16}rem`}
        width={`${500 / 12}rem`}
        zIndex={10}
      >
        <Alert title="Notice">
          <Typography variant="omega">
            {formatMessage({
              id: getTrad('SEOPage.info.information'),
              defaultMessage:
                "When adding your SEO component, make sure to name it 'seo' and to include it in the root of your Content-Type.",
            })}
          </Typography>
        </Alert>
      </Stack>

      <Info contentTypes={contentTypes} />
    </>
  );
};

export default memo(HomePage);
