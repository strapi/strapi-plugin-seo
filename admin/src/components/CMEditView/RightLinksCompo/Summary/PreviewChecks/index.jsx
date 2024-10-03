import * as React from 'react';
import { useIntl } from 'react-intl';

import { Box, Flex, Typography } from '@strapi/design-system';
import { CheckCircle, CrossCircle, WarningCircle } from '@strapi/icons';

import { getTrad } from '../../../../../utils/getTrad';
import { qualityVerdict } from '../../../utils/checks';

export const PreviewChecks = ({ checks }) => {
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
        <Flex gap={2} key={qualityVerdict.good}>
          <CheckCircle aria-hidden={true} fill={`success600`} />
          <Typography>
            {formatMessage({
              id: getTrad('Good'),
              defaultMessage: 'Good',
            })}
            {`: ${good}`}
          </Typography>
        </Flex>
        <Flex gap={2} key={qualityVerdict.improvements}>
          <WarningCircle aria-hidden={true} fill={`warning600`} />
          <Typography>
            {formatMessage({
              id: getTrad('Improvements'),
              defaultMessage: 'Improvements',
            })}
            {`: ${improvements}`}
          </Typography>
        </Flex>
        <Flex gap={2} key={qualityVerdict.bad}>
          <CrossCircle aria-hidden={true} fill={`danger600`} />
          <Typography>
            {formatMessage({
              id: getTrad('Bad'),
              defaultMessage: 'Bad',
            })}
            {`: ${bad}`}
          </Typography>
        </Flex>
      </Box>
    </Box>
  );
};
