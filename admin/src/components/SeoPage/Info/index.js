import React from 'react';

import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { LinkButton } from '@strapi/design-system/LinkButton';
import { Typography } from '@strapi/design-system/Typography';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils';

import Plus from '@strapi/icons/Plus';
import Check from '@strapi/icons/Check';

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
              <Typography variant="omega"> Collection Types</Typography>
            </Tab>
            <Tab>
              <Typography variant="omega"> Single Types</Typography>
            </Tab>
          </Tabs>
          <TabPanels>
            <TabPanel>
              {/* TABLE */}
              <Table
                colCount={2}
                rowCount={contentTypes.collectionTypes.length}
              >
                <Thead>
                  <Tr>
                    <Th>
                      <Typography variant="sigma">Name</Typography>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {contentTypes &&
                  contentTypes.collectionTypes &&
                  !_.isEmpty(contentTypes.collectionTypes) ? (
                    contentTypes.collectionTypes.map((item) => (
                      <Tr key={item.uid}>
                        <Td>
                          <Typography textColor="neutral800">
                            {item.globalId}
                          </Typography>
                        </Td>
                        <Td>
                          <Flex justifyContent="right" alignItems="right">
                            {item.seo ? (
                              <LinkButton disabled startIcon={<Check />}>
                                {formatMessage({
                                  id: getTrad('SEOPage.info.added'),
                                  defaultMessage: 'Added',
                                })}
                              </LinkButton>
                            ) : (
                              <LinkButton
                                startIcon={<Plus />}
                                variant="secondary"
                                to={`/plugins/content-type-builder/content-types/${item.uid}`}
                              >
                                {formatMessage({
                                  id: getTrad('SEOPage.info.add'),
                                  defaultMessage: 'Add component',
                                })}
                              </LinkButton>
                            )}
                          </Flex>
                        </Td>
                      </Tr>
                    ))
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
                              id: getTrad(
                                'SEOPage.info.create-collection-type'
                              ),
                              defaultMessage:
                                'Create your first collection-type',
                            })}
                          </LinkButton>
                        }
                      />
                    </Box>
                  )}
                </Tbody>
              </Table>

              {/* END TABLE */}
            </TabPanel>
            <TabPanel>
              {/* TABLE */}
              <Table colCount={2} rowCount={contentTypes.singleTypes.length}>
                <Thead>
                  <Tr>
                    <Th>
                      <Typography variant="sigma">Name</Typography>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {contentTypes &&
                  contentTypes.singleTypes &&
                  !_.isEmpty(contentTypes.singleTypes) ? (
                    contentTypes.singleTypes.map((item) => (
                      <Tr key={item.uid}>
                        <Td>
                          <Typography textColor="neutral800">
                            {item.globalId}
                          </Typography>
                        </Td>
                        <Td>
                          <Flex justifyContent="right" alignItems="right">
                            {item.seo ? (
                              <LinkButton disabled startIcon={<Check />}>
                                {formatMessage({
                                  id: getTrad('SEOPage.info.added'),
                                  defaultMessage: 'Added',
                                })}
                              </LinkButton>
                            ) : (
                              <LinkButton
                                startIcon={<Plus />}
                                variant="secondary"
                                to={`/plugins/content-type-builder/content-types/${item.uid}`}
                              >
                                {formatMessage({
                                  id: getTrad('SEOPage.info.add'),
                                  defaultMessage: 'Add component',
                                })}
                              </LinkButton>
                            )}
                          </Flex>
                        </Td>
                      </Tr>
                    ))
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
                </Tbody>
              </Table>

              {/* END TABLE */}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Box>
    </>
  );
};

export default Info;
