import * as React from 'react';

import isEqual from 'lodash/isEqual';
import isNull from 'lodash/isNull';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../utils/getTrad';

import { Box, Typography } from '@strapi/design-system';

import { SEOAccordion } from '../SEOAccordion';

import { SeoCheckerContext } from '../../Summary';
import { qualityVerdict } from '../../../utils/checks';

export const CanonicalUrlCheck = ({ canonicalUrl, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = React.useContext(SeoCheckerContext);

  let status = {
    message: formatMessage({
      id: getTrad('SEOChecks.canonicalUrlCheck.found'),
      defaultMessage: 'A canonical URL has been found.',
    }),
    qualityVerdict: qualityVerdict.good,
  };

  React.useEffect(() => {
    if (isNull(canonicalUrl)) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.canonicalUrlCheck.default'),
          defaultMessage: 'No Canonical URL has been found.',
        }),
        qualityVerdict: qualityVerdict.bad,
      };
    }
    if (!isEqual(status, checks.canonicalUrl))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'canonicalUrl' },
      });
  }, []);

  return (
    <SEOAccordion
      title={formatMessage({
        id: getTrad('SEOModal.summary-title.canonical-url'),
        defaultMessage: 'Canonical URL',
      })}
      status={checks.canonicalUrl}
      label={formatMessage({
        id: getTrad('SEOChecks.canonicalUrlCheck.label'),
        defaultMessage: 'This will check if you have a canonical URL.',
      })}
      component={
        <Box padding={canonicalUrl ? 4 : 2}>
          {canonicalUrl && (
            <Typography variant="omega" fontWeight="bold">
              {canonicalUrl}
            </Typography>
          )}
        </Box>
      }
    />
  );
};
