import React, { useState, useEffect } from 'react';

import _ from 'lodash';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../utils';

import { Box } from '@strapi/design-system/Box';
import { Badge } from '@strapi/design-system/Badge';
import { Flex } from '@strapi/design-system/Flex';

import SEOAccordion from '../SEOAccordion';

const MetaSocialCheck = ({ metaSocial }) => {
  const { formatMessage } = useIntl();
  const [status, setStatus] = useState({
    message: '',
    color: '',
  });

  useEffect(() => {
    if (_.isNull(metaSocial)) {
      setStatus({
        message: formatMessage({
          id: getTrad('SEOChecks.metaSocialCheck.not-found'),
          defaultMessage: 'No Meta Social tags have been found.',
        }),
        color: 'danger',
      });
      return;
    }
    const count = metaSocial.filter((meta) => !_.isNull(meta.id)).length;
    if (count === 0) {
      setStatus({
        message: formatMessage({
          id: getTrad('SEOChecks.metaSocialCheck.not-found'),
          defaultMessage: 'No Meta Social tags have been found.',
        }),
        color: 'danger',
      });
    } else if (count == 1) {
      setStatus({
        message: formatMessage({
          id: getTrad('SEOChecks.metaSocialCheck.one'),
          defaultMessage: 'Only one Meta Social tag is being used.',
        }),
        color: 'warning',
      });
    } else {
      setStatus({
        message: `${count} ${formatMessage({
          id: getTrad('SEOChecks.metaSocialCheck.configured'),
          defaultMessage: ' Meta Social tags are configured',
        })}`,
        color: 'success',
      });
    }
  }, []);

  return (
    <SEOAccordion
      title="Meta Social Tags"
      status={status}
      label={formatMessage({
        id: getTrad('SEOChecks.metaSocialCheck.label'),
        defaultMessage:
          'Meta social tags allow you to manage the title, description & image of your posts.',
      })}
      component={
        metaSocial &&
        !_.isEmpty(metaSocial) && (
          <Box padding={2}>
            <Flex>
              {metaSocial.map((tag, index) => (
                <Box padding={1} key={index}>
                  <Badge>{tag.socialNetwork}</Badge>
                </Box>
              ))}
            </Flex>
          </Box>
        )
      }
    />
  );
};

export default MetaSocialCheck;
