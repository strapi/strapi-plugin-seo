/*
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState, useRef } from 'react';

import { Box } from '@strapi/design-system/Box';

import {
  LoadingIndicatorPage,
  ContentBox,
  useAutoReloadOverlayBlocker,
} from '@strapi/helper-plugin';

import { useIntl } from 'react-intl';
import { getTrad } from '../../utils';

import { fetchSeoComponent, fetchContentTypes } from '../../utils/api';

import Info from '../../components/HomePage/Main';
import Header from '../../components/HomePage/Header';

import { createSeoComponent } from '../../utils/api';

import InformationSquare from '@strapi/icons/InformationSquare';

const HomePage = () => {
  const { formatMessage } = useIntl();

  const { lockAppWithAutoreload, unlockAppWithAutoreload } =
    useAutoReloadOverlayBlocker();

  const [isLoading, setIsLoading] = useState(true);
  const [shouldEffect, setShouldEffect] = useState(false);

  const seoComponent = useRef({});
  const contentTypes = useRef({});

  // Fetching the SEO component & Content-Types
  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData().then(() => {
      setIsLoading(false);
    });
  }, [shouldEffect]);

  // Displaying the LoadingIndicatorPage while it fetches the data
  if (isLoading) {
    return <LoadingIndicatorPage />;
  }

  return (
    <>
      <Header seoComponent={seoComponent.current} />

      <Box paddingLeft={8} paddingRight={8}>
        <ContentBox
          title={formatMessage({
            id: 'Information',
            defaultMessage: 'Information',
          })}
          subtitle={formatMessage({
            id: getTrad('HomePage.info.information'),
            defaultMessage:
              "When adding your SEO component, make sure to name it 'seo' and to include it in the root of your Content-Type.",
          })}
          icon={<InformationSquare />}
          iconBackground="primary100"
        />
      </Box>

      <Info contentTypes={contentTypes.current} />
    </>
  );
};

export default memo(HomePage);
