import React, { useState, useEffect } from 'react';

import _ from 'lodash';

import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { Badge } from '@strapi/design-system/Badge';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../utils';

import SEOAccordion from '../SEOAccordion';

const KeywordDensityCheck = ({ keywordsDensity }) => {
  const { formatMessage } = useIntl();
  const [status, setStatus] = useState({
    message: formatMessage({
      id: getTrad('SEOChecks.keywordsDensityCheck.default'),
      defaultMessage: 'Every keywords are used more than 2 times.',
    }),
    color: 'success',
  });

  useEffect(() => {
    if (_.isEmpty(keywordsDensity)) {
      setStatus({
        message: formatMessage({
          id: getTrad('SEOChecks.keywordsDensityCheck.no-keywords'),
          defaultMessage: 'No keywords were found in your SEO component.',
        }),
        color: 'danger',
      });
      return;
    }
    Object.keys(keywordsDensity).map((keyword) => {
      if (_.get(keywordsDensity[keyword], 'count', 0) === 0) {
        setStatus({
          message: formatMessage({
            id: getTrad('SEOChecks.keywordsDensityCheck.one-not-used'),
            defaultMessage: 'One keyword is not being used in your content.',
          }),
          color: 'danger',
        });
      } else if (_.get(keywordsDensity[keyword], 'count', 0) <= 1) {
        setStatus({
          message: formatMessage({
            id: getTrad('SEOChecks.keywordsDensityCheck.one-used-once'),
            defaultMessage: 'One keyword is only used once in your content.',
          }),
          color: 'warning',
        });
      }
    });
  }, []);

  return (
    <SEOAccordion
      title="Keyword Density"
      status={status}
      label={formatMessage({
        id: getTrad('SEOChecks.keywordsDensityCheck.label'),
        defaultMessage:
          'Define keywords you want to rank for in your SEO component. This will analyse the density of your keywords in your 1st level richtext editors.',
      })}
      component={
        keywordsDensity &&
        !_.isEmpty(keywordsDensity) && (
          <Box padding={2}>
            <Flex>
              {Object.keys(keywordsDensity).map((keyword) => (
                <Box padding={1} key={keyword}>
                  <Badge>
                    {`${keyword}: 
                      ${_.get(
                        keywordsDensity[keyword],
                        'count',
                        0
                      ).toString()}`}
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
