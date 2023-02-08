import React from 'react';

import { Box } from '@strapi/design-system/Box';
import { Icon } from '@strapi/design-system/Icon';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../utils';

import Dot from '@strapi/icons/Dot';

import _ from 'lodash';

const SeoChecker = ({ checks }) => {
  const { formatMessage } = useIntl();

  const good = Object.values(checks).filter(
    (x) => x.color === 'success'
  ).length;
  const improvements = Object.values(checks).filter(
    (x) => x.color === 'warning'
  ).length;
  const bad = Object.values(checks).filter((x) => x.color === 'danger').length;

  return (
    <Box paddingTop={4}>
      <Typography variant="omega" fontWeight="semiBold">
        {formatMessage({
          id: getTrad('SEORightLinks.summary-title'),
          defaultMessage: 'SEO Summary'
        })}
      </Typography>

      <Box paddingTop={4}>
        <Stack spacing={2} key="good" horizontal background="neutral0">
          <Icon
            aria-hidden={true}
            colors={(theme) => ({
              rect: {
                fill: _.get(theme, `colors.success600`),
              },
            })}
            as={Dot}
          />
          <Typography>
            {formatMessage({
              id: getTrad('Good'),
              defaultMessage: 'Good',
            })}
            : {good}
          </Typography>
        </Stack>
        <Stack spacing={2} key="improvements" horizontal background="neutral0">
          <Icon
            aria-hidden={true}
            colors={(theme) => ({
              rect: {
                fill: _.get(theme, `colors.warning600`),
              },
            })}
            as={Dot}
          />
          <Typography>
            {formatMessage({
              id: getTrad('Improvements'),
              defaultMessage: 'Improvements',
            })}
            : {improvements}
          </Typography>
        </Stack>
        <Stack spacing={2} key="bad" horizontal background="neutral0">
          <Icon
            aria-hidden={true}
            colors={(theme) => ({
              rect: {
                fill: _.get(theme, `colors.danger600`),
              },
            })}
            as={Dot}
          />
          <Typography>
            {formatMessage({
              id: getTrad('Bad'),
              defaultMessage: 'Bad',
            })}
            : {bad}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default SeoChecker;
