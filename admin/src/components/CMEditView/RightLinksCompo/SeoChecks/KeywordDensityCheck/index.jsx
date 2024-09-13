import React, { useContext, useEffect } from 'react';
import { useIntl } from 'react-intl';
import _ from 'lodash';

import { Box, Flex, Badge } from '@strapi/design-system';

import { getTrad } from '../../../../../utils/getTrad';

import SEOAccordion from '../SEOAccordion';

import { SeoCheckerContext } from '../../Summary';
import { qualityVerdict } from '../../../utils/checks';

const KeywordDensityCheck = ({ keywordsDensity, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = useContext(SeoCheckerContext);

  let status = {
    message: formatMessage({
      id: getTrad('SEOChecks.keywordsDensityCheck.default'),
      defaultMessage: 'Every keywords are used more than 2 times.',
    }),
    qualityVerdict: qualityVerdict.good,
  };

  useEffect(() => {
    if (_.isEmpty(keywordsDensity)) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.keywordsDensityCheck.no-keywords'),
          defaultMessage: 'No keywords were found in your SEO component.',
        }),
        qualityVerdict: qualityVerdict.improvements,
      };
    } else {
      Object.keys(keywordsDensity).map((keyword) => {
        if (_.get(keywordsDensity[keyword], 'count', 0) === 0) {
          status = {
            message: formatMessage({
              id: getTrad('SEOChecks.keywordsDensityCheck.one-not-used'),
              defaultMessage: 'One keyword is not being used in your content.',
            }),
            qualityVerdict: qualityVerdict.improvements,
          };
        } else if (_.get(keywordsDensity[keyword], 'count', 0) <= 1) {
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

    if (!_.isEqual(status, checks.keywordsDensity))
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
        !_.isEmpty(keywordsDensity) && (
          <Box padding={2}>
            <Flex wrap="wrap">
              {Object.keys(keywordsDensity).map((keyword) => (
                <Box padding={2} key={keyword}>
                  <Badge>
                    {`${keyword}:
                      ${_.get(keywordsDensity[keyword], 'count', 0).toString()}`}
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

export default KeywordDensityCheck;
