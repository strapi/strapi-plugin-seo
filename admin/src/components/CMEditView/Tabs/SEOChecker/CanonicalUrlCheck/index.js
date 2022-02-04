import React, { useState, useEffect } from 'react';

import _ from 'lodash';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../utils';

import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';

import SEOAccordion from '../SEOAccordion';

const CanonicalUrlCheck = ({ canonicalUrl }) => {
  const { formatMessage } = useIntl();

  const [status, setStatus] = useState({
    message: formatMessage({
      id: getTrad('SEOChecks.canonicalUrlCheck.found'),
      defaultMessage: 'A canonical URL has been found.',
    }),
    color: 'success',
  });

  useEffect(() => {
    if (_.isNull(canonicalUrl)) {
      setStatus({
        message: formatMessage({
          id: getTrad('SEOChecks.canonicalUrlCheck.default'),
          defaultMessage: 'No Canonical URL has been found.',
        }),
        color: 'warning',
      });
    }
  }, []);

  return (
    <SEOAccordion
      title="Canonical URL"
      status={status}
      label={formatMessage({
        id: getTrad('SEOChecks.canonicalUrlCheck.label'),
        defaultMessage:
          'This will check if you have a canonical URL.',
      })}
      component={
        canonicalUrl && (
          <Box padding={2}>
            <Typography variant="omega">
              {formatMessage({
                id: getTrad('SEOChecks.canonicalUrlCheck.url'),
                defaultMessage: 'Canonical URL:',
              })}{' '}
              {canonicalUrl}
            </Typography>
          </Box>
        )
      }
    />
  );
};

export default CanonicalUrlCheck;
