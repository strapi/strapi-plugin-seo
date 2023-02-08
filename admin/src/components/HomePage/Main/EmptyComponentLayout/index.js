import React from 'react';

import { Box } from '@strapi/design-system/Box';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';

import { Illo } from './illo';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../utils';

const EmptyComponentLayout = () => {
  const { formatMessage } = useIntl();

  return (
    <Box padding={8} background="neutral100">
      <EmptyStateLayout
        icon={<Illo />}
        content={formatMessage({
          id: getTrad('SEOPage.empty-component-layout.no-component'),
          defaultMessage: "You don't have any SEO component yet",
        })}
      />
    </Box>
  );
};

export default EmptyComponentLayout;
