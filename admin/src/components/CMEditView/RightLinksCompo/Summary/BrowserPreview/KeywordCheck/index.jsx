import React from 'react';
import _ from 'lodash';

import { Flex, Typography } from '@strapi/design-system';

import { More } from '@strapi/icons';

const KeywordCheck = ({ item, keywords, label }) => {
  const _keywords = keywords.split(',');
  const matches = _keywords.filter((x) => item.toLowerCase().includes(x.toLowerCase().trim()));

  return (
    <Flex spacing={1} horizontal>
      <More
        aria-hidden={true}
        colors={(theme) => ({
          rect: {
            fill: _.get(theme, `colors.${matches.length === 0 ? `warning` : `success`}600`),
          },
        })}
      />
      <Typography>{`You use ${matches.length} keyword${
        matches.length > 1 ? 's' : ''
      } in your ${label} (${matches.join(', ').trim()})`}</Typography>
    </Flex>
  );
};

export default KeywordCheck;
