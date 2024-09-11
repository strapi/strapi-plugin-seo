import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { Box, LinkButton } from '@strapi/design-system';
import { Pencil } from '@strapi/icons';
import { Layouts } from '@strapi/admin/strapi-admin';

import { getTrad } from '../../../utils/getTrad';

const Header = (seoComponent) => {
  const { formatMessage } = useIntl();

  return (
    <Box background="neutral100">
      <Layouts.Header
        secondaryAction={
          seoComponent ? null : (
            <LinkButton
              tag={NavLink}
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
