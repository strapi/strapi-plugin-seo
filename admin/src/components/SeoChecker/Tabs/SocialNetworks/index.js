import React from 'react';

import MetaSocialAccordion from './MetaSocialAccordion';

import { Box } from '@strapi/design-system/Box';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';

import { Illo } from '../../../SeoPage/Info/EmptyComponentLayout/illo';

import _ from 'lodash';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../utils';

const SocialNetworks = ({ modifiedData }) => {
  const { formatMessage } = useIntl();

  const metaSocial = _.get(modifiedData, 'seo.metaSocial', []);
  return (
    <Box padding={4}>
      {metaSocial &&
        metaSocial.map((item, index) => {
          return <MetaSocialAccordion item={item} index={index} key={index} />;
        })}

      {_.isEmpty(metaSocial) && (
        <EmptyStateLayout
          icon={<Illo />}
          content={formatMessage({
            id: getTrad('Social-network.no-tags'),
            defaultMessage: "You don't have any meta social tags yet.",
          })}
        />
      )}
    </Box>
  );
};

export default SocialNetworks;
