import React from 'react';
import _ from 'lodash';
import { useIntl } from 'react-intl';

import {
  Box,
  Alert,
  Divider,
  Typography,
  EmptyStateLayout,
  Tabs,
  Modal,
} from '@strapi/design-system';

import { Illo } from '../../../../HomePage/Main/EmptyComponentLayout/illo';
import TabContent from './TabContent';

import { getTrad } from '../../../../../utils/getTrad';

const SocialPreview = ({ modifiedData, setIsVisible }) => {
  const { formatMessage } = useIntl();

  const seo = _.get(modifiedData, 'seo', null);
  const metaSocial = _.get(seo, 'metaSocial', []);
  const keywords = _.get(seo, 'keywords', null);

  return (
    <Modal.Content onClose={() => setIsVisible((prev) => !prev)} labelledBy="title">
      <Modal.Header>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {formatMessage({
            id: getTrad('Plugin.name'),
            defaultMessage: 'SEO Plugin',
          })}
        </Typography>
      </Modal.Header>
      <Modal.Body>
        <Box paddingTop={2} paddingBottom={4} paddingLeft={4}>
          <Typography variant="beta">
            {formatMessage({
              id: getTrad('Button.social-preview'),
              defaultMessage: 'Social Preview',
            })}
          </Typography>
          <Box paddingTop={4}>
            <Divider />
          </Box>
        </Box>

        {seo ? (
          <Box padding={4}>
            <Tabs.Root label="Some stuff for the label" id="tabs" variant="simple">
              <Tabs.List>
                {metaSocial &&
                  metaSocial.map((item, index) => {
                    if (item.socialNetwork) {
                      return <Tabs.Trigger key={index}>{item.socialNetwork}</Tabs.Trigger>;
                    }
                  })}
              </Tabs.List>
              <Tabs.Content>
                {metaSocial &&
                  metaSocial.map((item, index) => {
                    if (item.socialNetwork && item.title && item.description)
                      return (
                        <TabContent
                          key={index}
                          item={item}
                          keywords={keywords}
                          defaultMetaImage={seo?.metaImage}
                        />
                      );
                    else {
                      return (
                        <Box paddingTop={4} key={index}>
                          <Alert closeLabel="Close alert" title="Notice">
                            {formatMessage({
                              id: getTrad('Social-preview.alert'),
                              defaultMessage: 'Complete you social component to see the preview',
                            })}
                          </Alert>
                        </Box>
                      );
                    }
                  })}
              </Tabs.Content>
            </Tabs.Root>
          </Box>
        ) : (
          <Box paddingLeft={4}>
            <EmptyStateLayout
              icon={<Illo />}
              content={formatMessage({
                id: getTrad('Modal.seo-component-empy'),
                defaultMessage: 'Your SEO component is empty...',
              })}
            />
          </Box>
        )}
      </Modal.Body>
      <Modal.Footer />
    </Modal.Content>
  );
};

export default SocialPreview;
