import * as React from 'react';
import { useIntl } from 'react-intl';

import isEqual from 'lodash/isEqual';
import isNull from 'lodash/isNull';
import isNumber from 'lodash/isNumber';

import { Box, Typography } from '@strapi/design-system';

import { SEOAccordion } from '../SEOAccordion';
import { SeoCheckerContext } from '../../Summary';

import { getTrad } from '../../../../../utils/getTrad';
import { qualityVerdict } from '../../../utils/checks';

export const WordCountCheck = ({ wordCount, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = React.useContext(SeoCheckerContext);

  let status = {
    message: formatMessage({
      id: getTrad('SEOChecks.wordCountCheck.default'),
      defaultMessage:
        'You have more than 300 words. The word counter is not a direct ranking factor. But your content should be as high quality as possible, with relevant and unique information. To meet these conditions, your content requires a minimum of paragraphs, and therefore of words.',
    }),
    qualityVerdict: qualityVerdict.good,
  };

  React.useEffect(() => {
    if (isNull(wordCount)) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.wordCountCheck.not-found'),
          defaultMessage: 'No Richtext content have been found.',
        }),
        qualityVerdict: qualityVerdict.improvements,
      };
      return;
    } else if (wordCount < 300) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.wordCountCheck.300'),
          defaultMessage: 'Your 1st level Richtext contents have less than 300 words.',
        }),
        qualityVerdict: qualityVerdict.improvements,
      };
    }
    if (!isEqual(status, checks.wordCount))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'wordCount' },
      });
  }, []);

  return (
    <SEOAccordion
      title={formatMessage({
        id: getTrad('SEOModal.summary-title.word-counter'),
        defaultMessage: 'Word Counter',
      })}
      status={checks.wordCount}
      label={formatMessage({
        id: getTrad('SEOChecks.wordCountCheck.label'),
        defaultMessage:
          'Your content should be as high quality as possible, with relevant and unique information. You entry requires a minimum of paragraphs, and therefore of words.',
      })}
      component={
        isNumber(wordCount) && (
          <Box padding={4}>
            <Typography variant="omega" fontWeight="semiBold">
              {formatMessage({
                id: getTrad('SEOChecks.wordCountCheck.words'),
                defaultMessage: 'Words:',
              })}{' '}
              {wordCount}
            </Typography>
          </Box>
        )
      }
    />
  );
};
