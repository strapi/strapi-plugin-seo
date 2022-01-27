import React from 'react';

import SingleType from '@strapi/icons/SingleType';
import CollectionType from '@strapi/icons/CollectionType';

import { Box } from '@strapi/design-system/Box';
import { LinkButton } from '@strapi/design-system/LinkButton';
import { GridLayout } from '@strapi/design-system/Layout';
import { Typography } from '@strapi/design-system/Typography';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils';

import Item from './Item';

import Plus from '@strapi/icons/Plus';
import ExclamationMarkCircle from '@strapi/icons/ExclamationMarkCircle';

import { Illo } from '../Info/EmptyComponentLayout/illo';

import {
  Tabs,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel,
} from '@strapi/design-system/Tabs';

import _ from 'lodash';

const Info = ({ contentTypes }) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <Box padding={8}>
        <TabGroup label="label" id="tabs">
          <Tabs>
            <Tab>
              <CollectionType />
              <Typography variant="omega"> Collection Types</Typography>
            </Tab>
            <Tab>
              <SingleType />
              <Typography variant="omega"> Single Types</Typography>
            </Tab>
          </Tabs>
          <TabPanels>
            <TabPanel>
              <Box padding={8} background="neutral0">
                {contentTypes &&
                contentTypes.collectionTypes &&
                !_.isEmpty(contentTypes.collectionTypes) ? (
                  <GridLayout>
                    {contentTypes.collectionTypes.map((item, index) => (
                      <Item item={item} key={index} />
                    ))}
                  </GridLayout>
                ) : (
                  <Box padding={8} background="neutral0">
                    <EmptyStateLayout
                      icon={<Illo />}
                      content={formatMessage({
                        id: getTrad('SEOPage.info.no-collection-types'),
                        defaultMessage:
                          "You don't have any collection-types yet...",
                      })}
                      action={
                        <LinkButton
                          to="/plugins/content-type-builder"
                          variant="secondary"
                          startIcon={<Plus />}
                        >
                          {formatMessage({
                            id: getTrad('SEOPage.info.create-collection-type'),
                            defaultMessage: 'Create your first collection-type',
                          })}
                        </LinkButton>
                      }
                    />
                  </Box>
                )}
              </Box>
            </TabPanel>
            <TabPanel>
              <Box padding={8} background="neutral0">
                {contentTypes &&
                contentTypes.singleTypes &&
                !_.isEmpty(contentTypes.singleTypes) ? (
                  <GridLayout>
                    {contentTypes.singleTypes.map((item, index) => (
                      <Item item={item} key={index} />
                    ))}
                  </GridLayout>
                ) : (
                  <Box padding={8} background="neutral0">
                    <EmptyStateLayout
                      icon={<Illo />}
                      content={formatMessage({
                        id: getTrad('SEOPage.info.no-single-types'),
                        defaultMessage:
                          "You don't have any single-types yet...",
                      })}
                      action={
                        <LinkButton
                          to="/plugins/content-type-builder"
                          variant="secondary"
                          startIcon={<Plus />}
                        >
                          {formatMessage({
                            id: getTrad('SEOPage.info.create-single-type'),
                            defaultMessage: 'Create your first single-type',
                          })}
                        </LinkButton>
                      }
                    />
                  </Box>
                )}
              </Box>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Box>
      <Box padding={8} background="neutral100">
        <Box
          padding={4}
          background="neutral0"
          alignItems="center"
          justifyContent="center"
        >
          <ExclamationMarkCircle />{' '}
          <Typography variant="omega">
            {formatMessage({
              id: getTrad('SEOPage.info.information'),
              defaultMessage:
                "When adding your SEO component, make sure to name it 'seo' and to include it in the root of your Content-Type.",
            })}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Info;
