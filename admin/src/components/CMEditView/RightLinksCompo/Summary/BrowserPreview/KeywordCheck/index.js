import React from 'react';

import _ from 'lodash';

import { Icon } from '@strapi/design-system/Icon';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';

import Dot from '@strapi/icons/Dot';

const KeywordCheck = ({ item, keywords, label }) => {
  const _keywords = keywords.split(',');
  const matches = _keywords.filter((x) => item.includes(x.trim()));

  return (
    <Stack size={1} horizontal background="neutral0">
      <Icon
        aria-hidden={true}
        colors={(theme) => ({
          rect: {
            fill: _.get(
              theme,
              `colors.${matches.length === 0 ? `warning` : `success`}600`
            ),
          },
        })}
        as={Dot}
      />
      <Typography>{`You use ${
        matches.length
      } keywords in your ${label} (${matches.join(', ')})`}</Typography>
    </Stack>
  );
};

export default KeywordCheck;
