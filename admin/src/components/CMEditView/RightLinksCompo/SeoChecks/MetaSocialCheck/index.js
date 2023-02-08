import React, { useContext, useEffect } from 'react';

import _ from 'lodash';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../utils';

import { Box } from '@strapi/design-system/Box';
import { Badge } from '@strapi/design-system/Badge';
import { Flex } from '@strapi/design-system/Flex';

import SEOAccordion from '../SEOAccordion';

import { SeoCheckerContext } from '../../Summary';

const MetaSocialCheck = ({ metaSocial, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = useContext(SeoCheckerContext);

  let status = {
    message: '',
    color: '',
  };

  useEffect(() => {
    if (_.isNull(metaSocial) || metaSocial === undefined) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.metaSocialCheck.not-found'),
          defaultMessage: 'No Meta Social tags have been found.',
        }),
        color: 'danger',
      };
    } else {
      const count = metaSocial.filter((meta) => !_.isNull(meta.id)).length;
      if (count === 0) {
        status = {
          message: formatMessage({
            id: getTrad('SEOChecks.metaSocialCheck.not-found'),
            defaultMessage: 'No Meta Social tags have been found.',
          }),
          color: 'danger',
        };
      } else if (count == 1) {
        status = {
          message: formatMessage({
            id: getTrad('SEOChecks.metaSocialCheck.one'),
            defaultMessage: 'Only one Meta Social tag is being used.',
          }),
          color: 'warning',
        };
      } else {
        status = {
          message: `${count} ${formatMessage({
            id: getTrad('SEOChecks.metaSocialCheck.configured'),
            defaultMessage: ' Meta Social tags are configured',
          })}`,
          color: 'success',
        };
      }
    }

    if (!_.isEqual(status, checks.metaSocial))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'metaSocial' },
      });
  }, []);

  return (
    <SEOAccordion
      title={formatMessage({id: getTrad('SEOModal.summary-title.meta-social'), defaultMessage: 'Meta Social Tags'})}
      status={checks.metaSocial}
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
                <Box padding={2} key={index}>
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
