import * as React from 'react';
import { useIntl } from 'react-intl';

import isEqual from 'lodash/isEqual';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';

import { Box, Badge, Flex } from '@strapi/design-system';

import { SEOAccordion } from '../SEOAccordion';
import { SeoCheckerContext } from '../../Summary';

import { getTrad } from '../../../../../utils/getTrad';
import { qualityVerdict } from '../../../utils/checks';

export const MetaSocialCheck = ({ metaSocial, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = React.useContext(SeoCheckerContext);

  let status = {
    message: '',
    qualityVerdict: qualityVerdict.good,
  };

  React.useEffect(() => {
    if (isNull(metaSocial) || metaSocial === undefined) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.metaSocialCheck.not-found'),
          defaultMessage: 'No Meta Social tags have been found.',
        }),
        qualityVerdict: qualityVerdict.improvements,
      };
    } else {
      const count = metaSocial.filter((meta) => !isNull(meta.id)).length;
      if (count === 0) {
        status = {
          message: formatMessage({
            id: getTrad('SEOChecks.metaSocialCheck.not-found'),
            defaultMessage: 'No Meta Social tags have been found.',
          }),
          qualityVerdict: qualityVerdict.improvements,
        };
      } else if (count == 1) {
        status = {
          message: formatMessage({
            id: getTrad('SEOChecks.metaSocialCheck.one'),
            defaultMessage: 'Only one Meta Social tag is being used.',
          }),
          qualityVerdict: qualityVerdict.bad,
        };
      } else {
        status = {
          message: `${count} ${formatMessage({
            id: getTrad('SEOChecks.metaSocialCheck.configured'),
            defaultMessage: ' Meta Social tags are configured',
          })}`,
          qualityVerdict: qualityVerdict.good,
        };
      }
    }

    if (!isEqual(status, checks.metaSocial))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'metaSocial' },
      });
  }, []);

  return (
    <SEOAccordion
      title={formatMessage({
        id: getTrad('SEOModal.summary-title.meta-social'),
        defaultMessage: 'Meta Social Tags',
      })}
      status={checks.metaSocial}
      label={formatMessage({
        id: getTrad('SEOChecks.metaSocialCheck.label'),
        defaultMessage:
          'Meta social tags allow you to manage the title, description & image of your posts.',
      })}
      component={
        metaSocial &&
        !isEmpty(metaSocial) && (
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
