import React from 'react';
import _ from 'lodash';

import { Flex, Typography } from '@strapi/design-system';
import { More } from '@strapi/icons';

const MetaChecks = ({ item, max, label, minLimit = false }) => {
  return (
    <Flex spacing={1} horizontal>
      <More
        aria-hidden={true}
        colors={(theme) => ({
          rect: {
            fill: _.get(
              theme,
              `colors.${
                item.length >= max ||
                (label === 'title' && item.length === 0) ||
                (minLimit && label === 'description' && item.length <= 50)
                  ? `danger`
                  : `success`
              }600`
            ),
          },
        })}
      />
      <Typography>{`Your ${label} is ${item.length || 0} characters long (max ${max})`}</Typography>
    </Flex>
  );
};

export default MetaChecks;
