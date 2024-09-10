import * as React from 'react';

import { Box } from '@strapi/design-system';
import { useForm } from '@strapi/admin/strapi-admin';

import Summary from './Summary';

export const SeoChecker = () => {
  const modifiedData = useForm('ActionName', ({ modified }) => modified);

  if (modifiedData.hasOwnProperty('seo')) {
    return (
      <Box
        background="neutral0"
        borderColor="neutral150"
        hasRadius
        paddingBottom={4}
        paddingLeft={4}
        paddingRight={4}
        paddingTop={6}
        shadow="tableShadow"
      >
        <Summary />
      </Box>
    );
  }
  return <React.Fragment />;
};
