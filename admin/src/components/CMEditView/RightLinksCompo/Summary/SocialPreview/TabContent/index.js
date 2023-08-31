import React from 'react';

import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { Stack } from '@strapi/design-system/Stack';
import { TabPanel } from '@strapi/design-system/Tabs';
import { Divider } from '@strapi/design-system/Divider';

import FacebookPreview from '../FacebookPreview';
import TwitterPreview from '../TwitterPreview';

import MetaChecks from '../../BrowserPreview/MetaChecks';
import KeywordCheck from '../../BrowserPreview/KeywordCheck';

const TabContent = ({ item, keywords, defaultMetaImage }) => {
  return (
    <TabPanel>
      <Stack spacing={2}>
        <Box paddingTop={6} paddingBottom={6}>
          {item && (
            <Flex alignItems="center" justifyContent="center">
              {item.socialNetwork === 'Facebook' ? (
                <FacebookPreview
                  title={item.title}
                  description={item.description}
                  image={item.image || defaultMetaImage}
                />
              ) : (
                <TwitterPreview
                  title={item.title}
                  description={item.description}
                  image={item.image || defaultMetaImage}
                />
              )}
            </Flex>
          )}
          <Box paddingTop={8}>
            <Divider />
          </Box>
        </Box>

        <MetaChecks item={item.title} max={60} label="title" />
        <MetaChecks
          item={item.description}
          max={item.socialNetwork === 'Facebook' ? 65 : 125}
          label="description"
        />
        {keywords && (
          <>
            {item.title && (
              <KeywordCheck
                item={item.title}
                keywords={keywords}
                label="title"
              />
            )}

            {item.description && (
              <KeywordCheck
                item={item.description}
                keywords={keywords}
                label="description"
              />
            )}
          </>
        )}
      </Stack>
    </TabPanel>
  );
};

export default TabContent;
