import React from 'react';

import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { BaseHeaderLayout } from '@strapi/design-system/Layout';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils';

import Equalizer from '@strapi/icons/Equalizer';

const Header = (seoComponent) => {
  const { formatMessage } = useIntl();
  return (
    <Box background="neutral100">
      <BaseHeaderLayout
        secondaryAction={
          seoComponent ? null : (
            <LinkButton
              variant="tertiary"
              to="/admin/plugins/content-type-builder/component-categories/shared/shared.seo"
              startIcon={<Pencil />}
            >
              {formatMessage({
                id: getTrad('SEOPage.header.button.edit-component'),
                defaultMessage: 'Edit SEO component',
              })}
            </LinkButton>
          )
        }
        title={formatMessage({
          id: getTrad('SEOPage.header.title'),
          defaultMessage: 'SEO',
        })}
        subtitle={formatMessage({
          id: getTrad('SEOPage.header.subtitle'),
          defaultMessage: 'Optimize your content to be SEO friendly',
        })}
        as="h2"
      />
    </Box>
  );
};

export default Header;
