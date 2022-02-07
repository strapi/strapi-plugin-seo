import React, { useContext, useEffect } from 'react';

import _ from 'lodash';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../utils';

import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';

import SEOAccordion from '../SEOAccordion';

import { SeoCheckerContext } from '../../../RightLinksCompo/Summary';

const CanonicalUrlCheck = ({ canonicalUrl, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = useContext(SeoCheckerContext);

  let status = {
    message: formatMessage({
      id: getTrad('SEOChecks.canonicalUrlCheck.found'),
      defaultMessage: 'A canonical URL has been found.',
    }),
    color: 'success',
  };

  useEffect(() => {
    if (_.isNull(canonicalUrl)) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.canonicalUrlCheck.default'),
          defaultMessage: 'No Canonical URL has been found.',
        }),
        color: 'warning',
      };
    }
    if (!_.isEqual(status, checks.canonicalUrl))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'canonicalUrl' },
      });
  }, []);

  return (
    <SEOAccordion
      title="Canonical URL"
      status={checks.canonicalUrl}
      label={formatMessage({
        id: getTrad('SEOChecks.canonicalUrlCheck.label'),
        defaultMessage: 'This will check if you have a canonical URL.',
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
