import * as React from 'react';
import { useIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

import { Box, Flex, Badge } from '@strapi/design-system';

import { getTrad } from '../../../../../utils/getTrad';

import { SEOAccordion } from '../SEOAccordion';

import { SeoCheckerContext } from '../../Summary';
import { qualityVerdict } from '../../../utils/checks';

export const KeywordDensityCheck = ({ keywordsDensity, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = React.useContext(SeoCheckerContext);

  let status = {
    message: formatMessage({
      id: getTrad('SEOChecks.keywordsDensityCheck.default'),
      defaultMessage: 'Every keywords are used more than 2 times.',
    }),
    qualityVerdict: qualityVerdict.good,
  };

  React.useEffect(() => {
    if (isEmpty(keywordsDensity)) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.keywordsDensityCheck.no-keywords'),
          defaultMessage: 'No keywords were found in your SEO component.',
        }),
        qualityVerdict: qualityVerdict.improvements,
      };
    } else {
      Object.keys(keywordsDensity).map((keyword) => {
        if (get(keywordsDensity[keyword], 'count', 0) === 0) {
          status = {
            message: formatMessage({
              id: getTrad('SEOChecks.keywordsDensityCheck.one-not-used'),
              defaultMessage: 'One keyword is not being used in your content.',
            }),
            qualityVerdict: qualityVerdict.improvements,
          };
        } else if (get(keywordsDensity[keyword], 'count', 0) <= 1) {
          status = {
            message: formatMessage({
              id: getTrad('SEOChecks.keywordsDensityCheck.one-used-once'),
              defaultMessage: 'One keyword is only used once in your content.',
            }),
            qualityVerdict: qualityVerdict.bad,
          };
        }
      });
    }

    if (!isEqual(status, checks.keywordsDensity))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'keywordsDensity' },
      });
  }, []);

  return (
    <SEOAccordion
      title={formatMessage({
        id: getTrad('SEOModal.summary-title.word-densisty'),
        defaultMessage: 'Keyword Density',
      })}
      status={checks.keywordsDensity}
      label={formatMessage({
        id: getTrad('SEOChecks.keywordsDensityCheck.label'),
        defaultMessage:
          'Define keywords you want to rank for in your SEO component. This will analyse the density of your keywords in your 1st level richtext editors.',
      })}
      component={
        keywordsDensity &&
        !isEmpty(keywordsDensity) && (
          <Box padding={2} background="neutral100">
            <Flex wrap="wrap">
              {Object.keys(keywordsDensity).map((keyword) => (
                <Box padding={2} key={keyword}>
                  <Badge>
                    {`${keyword}:
                      ${get(keywordsDensity[keyword], 'count', 0).toString()}`}
                  </Badge>
                </Box>
              ))}
            </Flex>
          </Box>
        )
      }
    />
  );
};
