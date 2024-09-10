import React from 'react';
import { useIntl } from 'react-intl';
import { Box, EmptyStateLayout } from '@strapi/design-system';

import { Illo } from './illo';
import { getTrad } from '../../../../utils/getTrad';

export const EmptyComponentLayout = () => {
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
