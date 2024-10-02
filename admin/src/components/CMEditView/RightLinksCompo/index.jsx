import * as React from 'react';

// TODO update this in helper plugin docs
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';
import { Flex } from '@strapi/design-system';

import Summary from './Summary';

export const SeoChecker = () => {
  const {
    form: { values },
  } = useContentManagerContext();

  if (values.hasOwnProperty('seo')) {
    return (
      <Flex background="neutral0" borderColor="neutral150" padding={4} shadow="tableShadow">
        <Summary />
      </Flex>
    );
  }
  return <React.Fragment />;
};
