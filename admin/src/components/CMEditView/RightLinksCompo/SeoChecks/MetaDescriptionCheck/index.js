import React, { useContext, useEffect } from 'react';

import _ from 'lodash';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../utils';

import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { ProgressBar } from '@strapi/design-system';
import { Typography } from '@strapi/design-system/Typography';

import SEOAccordion from '../SEOAccordion';

import { SeoCheckerContext } from '../../Summary';

const MetaDescriptionCheck = ({ metaDescription, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = useContext(SeoCheckerContext);

  const maxLength = 160;
  const minimumLength = 50;

  let status = {
    message: formatMessage({
      id: getTrad('SEOChecks.metaDescriptionCheck.default'),
      defaultMessage: 'A Meta Description has been found!',
    }),
    color: 'success',
  };

  useEffect(() => {
    if (_.isNull(metaDescription) || _.isEmpty(metaDescription)) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.metaDescriptionCheck.not-found'),
          defaultMessage: 'No Meta Description has been found.',
        }),
        color: 'danger',
      };
    } else if (metaDescription.length > maxLength) {
      status = {
        message: formatMessage({
          id: getTrad('Title-settings.metaDescription-too-long'),
          defaultMessage: 'Meta Description is too long',
        }),
        color: 'warning',
      };
    } else if (metaDescription.length < minimumLength) {
      status = {
        message: formatMessage({
          id: getTrad('Title-settings.metaDescription-too-short'),
          defaultMessage: 'Meta Description is too short',
        }),
        color: 'warning',
      };
    }
    if (!_.isEqual(status, checks.metaDescription))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'metaDescription' },
      });
  }, []);

  return (
    <SEOAccordion
      title={formatMessage({
        id: getTrad('SEOModal.summary-title.meta-description'),
        defaultMessage: 'Meta description',
      })}
      status={checks.metaDescription}
      label={formatMessage({
        id: getTrad('Title-settings.metaDescription-tooltip'),
        defaultMessage: `A meta description is an HTML tag used to describe the content of a web page.\n This description appears below the title and URL of your page as it appears in search engine results.\n For it to remain visible in Google, it must not exceed 140-${maxLength} characters.`,
      })}
      component={
        metaDescription && (
          <Box padding={4} background="neutral100" marginTop={4}>
            <Typography variant="omega" fontWeight="semiBold">
              {metaDescription}
            </Typography>
            <Box paddingTop={2}>
              <Stack horizontal spacing={2}>
                <ProgressBar
                  value={
                    (metaDescription.length * 100) / maxLength > 100
                      ? 100
                      : (metaDescription.length * 100) / maxLength
                  }
                ></ProgressBar>
                <Typography variant="pi" padding={2}>
                  ({metaDescription.length}/{maxLength})
                </Typography>
              </Stack>
            </Box>
          </Box>
        )
      }
    />
  );
};

export default MetaDescriptionCheck;
