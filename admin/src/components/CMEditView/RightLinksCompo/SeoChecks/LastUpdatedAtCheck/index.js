import React, { useContext, useEffect } from 'react';

import { formatDistance, subDays } from 'date-fns';

import _ from 'lodash';

import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../utils';

import SEOAccordion from '../SEOAccordion';

import { SeoCheckerContext } from '../../Summary';

const LastUpdatedAtCheck = ({ updatedAt, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = useContext(SeoCheckerContext);

  let status = {
    message: formatMessage({
      id: getTrad('SSEOChecks.lastUpdatedAtCheck.default'),
      defaultMessage:
        'This content was modified over a year ago! Search engines love fresh content.',
    }),
    color: 'danger',
  };

  useEffect(() => {
    if (_.isNull(updatedAt)) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.lastUpdatedAtCheck.save-content'),
          defaultMessage: 'You must save this entry first.',
        }),
        color: 'warning',
      };
    } else {
      const oneYearAgo = Date.parse(
        new Date(new Date().setFullYear(new Date().getFullYear() - 1))
      );
      if (Date.parse(updatedAt) >= oneYearAgo) {
        status = {
          message: formatMessage({
            id: getTrad('SEOChecks.lastUpdatedAtCheck.success'),
            defaultMessage:
              'Awesome! This content was last modified in less than an year ago!',
          }),
          color: 'success',
        };
      }
    }
    if (!_.isEqual(status, checks.lastUpdatedAt))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'lastUpdatedAt' },
      });
  }, []);

  return (
    <SEOAccordion
      title={formatMessage({
        id: getTrad('SEOModal.summary-title.last-updated-at'),
        defaultMessage: 'Last updated at',
      })}
      label={formatMessage({
        id: getTrad('SEOChecks.lastUpdatedAtCheck.label'),
        defaultMessage:
          'Search engines love fresh content. This will check if your entry was last modified in less than an year ago.',
      })}
      status={checks.lastUpdatedAt}
      component={
        updatedAt && (
          <Box padding={4}>
            <Typography variant="omega">
              {formatMessage({
                id: getTrad('SEOChecks.lastUpdatedAtCheck.last"'),
                defaultMessage: 'Last updated at:',
              })}{' '}
              <Typography variant="omega" fontWeight="bold">
                {' '}
                {formatDistance(new Date(updatedAt), new Date(), {
                  addSuffix: true,
                })}
              </Typography>
            </Typography>
          </Box>
        )
      }
    />
  );
};

export default LastUpdatedAtCheck;
