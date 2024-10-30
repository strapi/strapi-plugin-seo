import * as React from 'react';
import { useIntl } from 'react-intl';
import isEqual from 'lodash/isEqual';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';

import { Box, Flex, ProgressBar, Typography } from '@strapi/design-system';

import { SEOAccordion } from '../SEOAccordion';
import { SeoCheckerContext } from '../../Summary';

import { getTrad } from '../../../../../utils/getTrad';
import { qualityVerdict } from '../../../utils/checks';

export const MetaDescriptionCheck = ({ metaDescription, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = React.useContext(SeoCheckerContext);

  const maxLength = 160;
  const minimumLength = 50;

  let status = {
    message: formatMessage({
      id: getTrad('SEOChecks.metaDescriptionCheck.default'),
      defaultMessage: 'A Meta Description has been found!',
    }),
    qualityVerdict: qualityVerdict.good,
  };

  React.useEffect(() => {
    if (isNull(metaDescription) || isEmpty(metaDescription)) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.metaDescriptionCheck.not-found'),
          defaultMessage: 'No Meta Description has been found.',
        }),
        qualityVerdict: qualityVerdict.improvements,
      };
    } else if (metaDescription.length > maxLength) {
      status = {
        message: formatMessage({
          id: getTrad('Title-settings.metaDescription-too-long'),
          defaultMessage: 'Meta Description is too long',
        }),
        qualityVerdict: qualityVerdict.bad,
      };
    } else if (metaDescription.length < minimumLength) {
      status = {
        message: formatMessage({
          id: getTrad('Title-settings.metaDescription-too-short'),
          defaultMessage: 'Meta Description is too short',
        }),
        qualityVerdict: qualityVerdict.bad,
      };
    }
    if (!isEqual(status, checks.metaDescription))
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
          <Box padding={4} background="neutral100">
            <Typography variant="omega" fontWeight="semiBold">
              {metaDescription}
            </Typography>
            <Box paddingTop={2}>
              <Flex horizontal spacing={2}>
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
              </Flex>
            </Box>
          </Box>
        )
      }
    />
  );
};
