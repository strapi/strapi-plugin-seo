import React from 'react';
import _ from 'lodash';

import { Flex, Typography } from '@strapi/design-system';
import { EmotionHappy, EmotionUnhappy } from '@strapi/icons';

const KeywordCheck = ({ item, keywords, label }) => {
  const _keywords = keywords.split(',');
  const matches = _keywords.filter((x) => item.toLowerCase().includes(x.toLowerCase().trim()));

  const getIcon = () => {
    if (matches.length === 0) {
      return <EmotionUnhappy aria-hidden={true} fill={`secondary700`} />;
    } else {
      return <EmotionHappy aria-hidden={true} fill={`success600`} />;
    }
  };

  return (
    <Flex spacing={1} horizontal>
      {getIcon()}
      <Typography>{`You use ${matches.length} keyword${
        matches.length > 1 ? 's' : ''
      } in your ${label} (${matches.join(', ').trim()})`}</Typography>
    </Flex>
  );
};

export default KeywordCheck;
