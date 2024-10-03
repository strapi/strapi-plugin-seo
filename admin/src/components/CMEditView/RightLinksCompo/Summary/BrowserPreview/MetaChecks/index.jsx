import * as React from 'react';

import { Flex, Typography } from '@strapi/design-system';
import { CheckCircle, WarningCircle } from '@strapi/icons';

export const MetaChecks = ({ item, max, label, minLimit = false }) => {
  const getIcon = () => {
    if (
      item.length >= max ||
      (label === 'title' && item.length === 0) ||
      (minLimit && label === 'description' && item.length <= 50)
    ) {
      return <WarningCircle aria-hidden={true} fill={`warning600`} />;
    } else {
      return <CheckCircle aria-hidden={true} fill={`success600`} />;
    }
  };
  return (
    <Flex spacing={1} horizontal>
      {getIcon()}
      <Typography>{`Your ${label} is ${item.length || 0} characters long (max ${max})`}</Typography>
    </Flex>
  );
};
