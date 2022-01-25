import React from 'react';

import {
  Tabs,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel,
} from '@strapi/design-system/Tabs';

import { Box } from '@strapi/design-system/Box';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils';

import SEOChecker from './SEOChecker';
import TitleSettings from './TitleSettings';
import SocialNetworks from './SocialNetworks';

const SeoTabs = ({ modifiedData, components, contentType }) => {
  const { formatMessage } = useIntl();

  return (
    <TabGroup label="Some stuff for the label" id="tabs">
      <Tabs>
        <Tab>
          {formatMessage({
            id: getTrad('Tabs.tabs.title-settings'),
            defaultMessage: 'Title settings',
          })}
        </Tab>
        <Tab>
          {formatMessage({
            id: getTrad('Tabs.tabs.social-networks'),
            defaultMessage: 'Social networks',
          })}
        </Tab>
        <Tab>
          {formatMessage({
            id: getTrad('Tabs.tabs.seo-analyse'),
            defaultMessage: 'SEO analyse',
          })}
        </Tab>
      </Tabs>
      <TabPanels>
        <TabPanel>
          <Box padding={4} background="neutral0">
            <TitleSettings modifiedData={modifiedData} />
          </Box>
        </TabPanel>
        <TabPanel>
          <Box padding={4} background="neutral0">
            <SocialNetworks modifiedData={modifiedData} />
          </Box>
        </TabPanel>
        <TabPanel>
          <Box padding={4} background="neutral0">
            <SEOChecker
              modifiedData={modifiedData}
              components={components}
              contentType={contentType}
            />
          </Box>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default SeoTabs;
