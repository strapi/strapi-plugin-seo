import React from 'react';

import _ from 'lodash';

import { Icon } from '@strapi/design-system/Icon';
import { Divider } from '@strapi/design-system';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';

import Dot from '@strapi/icons/Dot';

const KeywordCheck = ({ item, keywords, label }) => {
  const _keywords = keywords.split(',');
  const matches = _keywords.filter((x) => item.toLowerCase().includes(x.toLowerCase().trim()));

  return (
    <Stack spacing={1} horizontal>
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
      <Typography>{`You use ${matches.length} keyword${
        matches.length > 1 ? 's' : ''
      } in your ${label} (${matches.join(', ').trim()})`}</Typography>
    </Stack>
  );
};

export default KeywordCheck;
