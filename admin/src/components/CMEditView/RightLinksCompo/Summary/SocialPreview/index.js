import React from 'react';

import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@strapi/design-system/ModalLayout';

import { Tabs, Tab, TabGroup, TabPanels } from '@strapi/design-system/Tabs';

import _ from 'lodash';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../utils';

import { Box } from '@strapi/design-system/Box';
import { Alert } from '@strapi/design-system/Alert';
import { Button } from '@strapi/design-system/Button';
import { Divider } from '@strapi/design-system/Divider';
import { Typography } from '@strapi/design-system/Typography';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';

import TabContent from './TabContent';

import { Illo } from '../../../../SeoPage/Info/EmptyComponentLayout/illo';

const SocialPreview = ({ modifiedData, setIsVisible }) => {
  const { formatMessage } = useIntl();

  const seo = _.get(modifiedData, 'seo', null);
  const metaSocial = _.get(seo, 'metaSocial', []);
  const keywords = _.get(seo, 'keywords', null);

  return (
    <ModalLayout
      onClose={() => setIsVisible((prev) => !prev)}
      labelledBy="title"
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          SEO Plugin
        </Typography>
      </ModalHeader>
      <ModalBody>
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
            <TabGroup
              label="Some stuff for the label"
              id="tabs"
              variant="simple"
            >
              <Tabs>
                {metaSocial &&
                  metaSocial.map((item, index) => {
                    if (item.socialNetwork)
                      return <Tab key={index}>{item.socialNetwork}</Tab>;
                  })}
              </Tabs>
              <TabPanels>
                {metaSocial &&
                  metaSocial.map((item, index) => {
                    if (
                      item.socialNetwork &&
                      item.title &&
                      item.description &&
                      item.image
                    )
                      return (
                        <TabContent
                          key={index}
                          item={item}
                          keywords={keywords}
                        />
                      );
                    else {
                      return (
                        <Box padding={4} paddingTop={8} key={index}>
                          <Alert title="Notice">
                            Complete you social component to see the preview
                          </Alert>
                        </Box>
                      );
                    }
                  })}
              </TabPanels>
            </TabGroup>
          </Box>
        ) : (
          <Box padding={4}>
            <EmptyStateLayout
              icon={<Illo />}
              content={formatMessage({
                id: getTrad('Modal.seo-component-empy'),
                defaultMessage: 'Your SEO component is empty...',
              })}
            />
          </Box>
        )}
      </ModalBody>
      <ModalFooter
        startActions={
          <Button
            onClick={() => setIsVisible((prev) => !prev)}
            variant="tertiary"
          >
            {formatMessage({
              id: getTrad('Modal.cancel'),
              defaultMessage: 'Cancel',
            })}
          </Button>
        }
      />
    </ModalLayout>
  );
};

export default SocialPreview;
