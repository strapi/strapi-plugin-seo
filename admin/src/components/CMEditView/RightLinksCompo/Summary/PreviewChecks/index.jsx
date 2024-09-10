import React from 'react';
import { useIntl } from 'react-intl';
import _ from 'lodash';

import { Box, Flex, Typography } from '@strapi/design-system';
import { More } from '@strapi/icons';

import { getTrad } from '../../../../../utils/getTrad';

const SeoChecker = ({ checks }) => {
  const { formatMessage } = useIntl();

  const good = Object.values(checks).filter((x) => x.color === 'success').length;
  const improvements = Object.values(checks).filter((x) => x.color === 'warning').length;
  const bad = Object.values(checks).filter((x) => x.color === 'danger').length;

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
          <More
            aria-hidden={true}
            colors={(theme) => ({
              rect: {
                fill: _.get(theme, `colors.success600`),
              },
            })}
          />
          <Typography>
            {formatMessage({
              id: getTrad('Good'),
              defaultMessage: 'Good',
            })}
            : {good}
          </Typography>
        </Flex>
        <Flex spacing={2} key="improvements" horizontal background="neutral0">
          <More
            aria-hidden={true}
            colors={(theme) => ({
              rect: {
                fill: _.get(theme, `colors.warning600`),
              },
            })}
          />
          <Typography>
            {formatMessage({
              id: getTrad('Improvements'),
              defaultMessage: 'Improvements',
            })}
            : {improvements}
          </Typography>
        </Flex>
        <Flex spacing={2} key="bad" horizontal background="neutral0">
          <More
            aria-hidden={true}
            colors={(theme) => ({
              rect: {
                fill: _.get(theme, `colors.danger600`),
              },
            })}
          />
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
