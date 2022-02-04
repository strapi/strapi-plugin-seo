import React, { useState, useEffect } from 'react';

import _ from 'lodash';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../utils';

import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';

import SEOAccordion from '../SEOAccordion';

const MetaDescriptionCheck = ({ metaDescription }) => {
  const { formatMessage } = useIntl();

  const [status, setStatus] = useState({
    message: formatMessage({
      id: getTrad('SEOChecks.metaDescriptionCheck.default'),
      defaultMessage: 'A Meta Description has been found!',
    }),
    color: 'success',
  });

  useEffect(() => {
    if (_.isNull(metaDescription) || _.isEmpty(metaDescription)) {
      setStatus({
        message: formatMessage({
          id: getTrad('SEOChecks.metaDescriptionCheck.not-found'),
          defaultMessage: 'No Meta Description has been found.',
        }),
        color: 'danger',
      });
    } else if (metaDescription.length > 160) {
      setStatus({
        message: formatMessage({
          id: getTrad('Title-settings.metaDescription-too-long'),
          defaultMessage: 'Meta Description is too long',
        }),
        color: 'warning',
      });
    } else if (metaDescription.length < 50) {
      setStatus({
        message: formatMessage({
          id: getTrad('Title-settings.metaDescription-too-short'),
          defaultMessage: 'Meta Description is too short',
        }),
        color: 'warning',
      });
    }
  }, []);

  return (
    <SEOAccordion
      title="Meta description"
      status={status}
      label={formatMessage({
        id: getTrad('Title-settings.metaDescription-tooltip'),
        defaultMessage:
          'A meta description is an HTML tag used to describe the content of a web page.\n This description appears below the title and URL of your page as it appears in search engine results.\n For it to remain visible in Google, it must not exceed 140-160 characters.',
      })}
      component={
        metaDescription && (
          <Box padding={2}>
            <Typography variant="omega">
              {metaDescription} - ({metaDescription.length} / 160)
            </Typography>
          </Box>
        )
      }
    />
  );
};

export default MetaDescriptionCheck;
