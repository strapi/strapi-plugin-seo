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

const SocialPreview = ({ modifiedData }) => {
  const { formatMessage } = useIntl();

  const seo = modifiedData?.seo ?? null;
  const metaSocial = seo?.metaSocial ?? [];
  const keywords = seo?.keywords ?? null;

  const hasSeo = seo && Object.keys(seo).length > 0;
  const hasMetaSocial = metaSocial && Array.isArray(metaSocial) && metaSocial.length > 0;
  const hasKeywords = keywords && typeof keywords === 'string' && keywords.length > 0;

  const socialTabIds = metaSocial.map((item, index) => {
    return `socialTab-${item?.socialNetwork ?? 'unknown'}-${index}`;
  });

  return (
    <Modal.Content labelledBy="title">
      <Modal.Header>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {formatMessage({
            id: getTrad('Button.social-preview'),
            defaultMessage: 'Social Preview',
          })}
        </Typography>
      </Modal.Header>
      <Modal.Body>
        {hasSeo && hasMetaSocial && hasKeywords ? (
          <Tabs.Root defaultValue={socialTabIds[0]} id="tabs">
            <Tabs.List>
              {metaSocial &&
                metaSocial.map((item, index) => {
                  if (item.socialNetwork) {
                    return (
                      <Tabs.Trigger key={index} value={socialTabIds[index]}>
                        {item.socialNetwork}
                      </Tabs.Trigger>
                    );
                  }
                })}
            </Tabs.List>
            {metaSocial &&
              metaSocial.map((item, index) => {
                if (item.socialNetwork && item.title && item.description)
                  return (
                    <Tabs.Content value={socialTabIds[index]}>
                      <TabContent
                        key={index}
                        item={item}
                        keywords={keywords}
                        defaultMetaImage={seo?.metaImage}
                      />
                    </Tabs.Content>
                  );
                else {
                  return (
                    <Tabs.Content value={socialTabIds[index]}>
                      <Box paddingTop={4} key={index}>
                        <Alert closeLabel="Close alert" title="Notice">
                          {formatMessage({
                            id: getTrad('Social-preview.alert'),
                            defaultMessage: 'Complete you social component to see the preview',
                          })}
                        </Alert>
                      </Box>
                    </Tabs.Content>
                  );
                }
              })}
          </Tabs.Root>
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
    </Modal.Content>
  );
};

export default SocialPreview;
