import React, { useEffect, useContext } from 'react';

import _ from 'lodash';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../utils';

import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';

import SEOAccordion from '../SEOAccordion';

import { SeoCheckerContext } from '../../../RightLinksCompo/Summary';

const MetaTitleCheck = ({ metaTitle, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = useContext(SeoCheckerContext);

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
    } else if (metaTitle.length > 60) {
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
        title="Meta title"
        status={checks.metaTitle}
        label={formatMessage({
          id: getTrad('Title-settings.metaTitle-tooltip'),
          defaultMessage:
            'The title tag is the clickable title of a webpage that appears with the result on the SERP (search engine page results page).\n You should aim to make your SEO titles around 60 characters long. Clear title tags will go a long way towards making your website easy to read and understand.',
        })}
        component={
          metaTitle && (
            <Box padding={2}>
              <Typography variant="omega">
                {metaTitle} ({metaTitle.length}/60)
              </Typography>
            </Box>
          )
        }
      />
    </>
  );
};

export default MetaTitleCheck;
