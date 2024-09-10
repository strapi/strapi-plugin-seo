import React, { useEffect, useContext } from 'react';
import { useIntl } from 'react-intl';
import _ from 'lodash';

import { Box, Flex, ProgressBar, Typography } from '@strapi/design-system';

import SEOAccordion from '../SEOAccordion';
import { SeoCheckerContext } from '../../Summary';

import { getTrad } from '../../../../../utils/getTrad';

const MetaTitleCheck = ({ metaTitle, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = useContext(SeoCheckerContext);

  const maxLength = 60;

  let status = {
    message: formatMessage({
      id: getTrad('SEOChecks.metaTitleCheck.default'),
      defaultMessage: 'A Meta Title has been found!',
    }),
    color: 'success',
  };

  useEffect(() => {
    if (_.isNull(metaTitle) || _.isEmpty(metaTitle)) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.metaTitleCheck.not-found'),
          defaultMessage: 'No Meta Description has been found.',
        }),
        color: 'danger',
      };
    } else if (metaTitle.length > maxLength) {
      status = {
        message: formatMessage({
          id: getTrad('Title-settings.metaTitle-too-long'),
          defaultMessage: 'Meta Title is too long',
        }),
        color: 'warning',
      };
    }
    if (!_.isEqual(status, checks.metaTitle))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'metaTitle' },
      });
  }, []);

  return (
    <>
      <SEOAccordion
        title={formatMessage({
          id: getTrad('SEOModal.summary-title.meta-title'),
          defaultMessage: 'Meta title',
        })}
        status={checks.metaTitle}
        label={formatMessage({
          id: getTrad('Title-settings.metaTitle-tooltip'),
          defaultMessage:
            'The title tag is the clickable title of a webpage that appears with the result on the SERP (search engine page results page).\n You should aim to make your SEO titles around 60 characters long. Clear title tags will go a long way towards making your website easy to read and understand.',
        })}
        component={
          metaTitle && (
            <Box padding={4} background="neutral100" marginTop={4}>
              <Typography variant="omega" fontWeight="semiBold">
                {metaTitle}
              </Typography>

              <Box paddingTop={2}>
                <Flex horizontal spacing={2}>
                  <ProgressBar
                    value={
                      (metaTitle.length * 100) / maxLength > 100
                        ? 100
                        : (metaTitle.length * 100) / maxLength
                    }
                  ></ProgressBar>
                  <Typography variant="pi" padding={2}>
                    ({metaTitle.length}/{maxLength})
                  </Typography>
                </Flex>
              </Box>
            </Box>
          )
        }
      />
    </>
  );
};

export default MetaTitleCheck;
