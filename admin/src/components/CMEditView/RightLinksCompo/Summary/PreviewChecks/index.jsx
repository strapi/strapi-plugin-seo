import React from 'react';
import { useIntl } from 'react-intl';
import _ from 'lodash';

import { Box, Flex, Typography } from '@strapi/design-system';
import { Heart, EmotionHappy, EmotionUnhappy } from '@strapi/icons';

import { getTrad } from '../../../../../utils/getTrad';
import { qualityVerdict } from '../../../utils/checks';

const SeoChecker = ({ checks }) => {
  const { formatMessage } = useIntl();

  const good = Object.values(checks).filter(
    (check) => check.qualityVerdict === qualityVerdict.good
  ).length;
  const improvements = Object.values(checks).filter(
    (check) => check.qualityVerdict === qualityVerdict.improvements
  ).length;
  const bad = Object.values(checks).filter(
    (check) => check.qualityVerdict === qualityVerdict.bad
  ).length;

  return (
    <Box paddingTop={4}>
      <Typography variant="omega" fontWeight="semiBold">
        {formatMessage({
          id: getTrad('SEORightLinks.summary-title'),
          defaultMessage: 'SEO Summary',
        })}
      </Typography>

      <Box paddingTop={4}>
        <Flex spacing={2} key="good" horizontal background="neutral0">
          <Heart aria-hidden={true} fill={`danger500`} />
          <Typography>
            {formatMessage({
              id: getTrad('Good'),
              defaultMessage: 'Good',
            })}
            : {good}
          </Typography>
        </Flex>
        <Flex spacing={2} key="improvements" horizontal background="neutral0">
          <EmotionHappy aria-hidden={true} fill={`success500`} />
          <Typography>
            {formatMessage({
              id: getTrad('Improvements'),
              defaultMessage: 'Improvements',
            })}
            : {improvements}
          </Typography>
        </Flex>
        <Flex spacing={2} key="bad" horizontal background="neutral0">
          <EmotionUnhappy aria-hidden={true} fill={`secondary700`} />
          <Typography>
            {formatMessage({
              id: getTrad('Bad'),
              defaultMessage: 'Bad',
            })}
            : {bad}
          </Typography>
        </Flex>
      </Box>
    </Box>
  );
};

export default SeoChecker;
