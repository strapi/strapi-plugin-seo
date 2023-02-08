import React, { useState } from 'react';

import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@strapi/design-system/ModalLayout';

import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { Switch } from '@strapi/design-system/Switch';
import { Button } from '@strapi/design-system/Button';
import { Divider } from '@strapi/design-system/Divider';
import { Typography } from '@strapi/design-system/Typography';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';

import Serp from './Serp';
import SerpMobile from './SerpMobile';
import MetaChecks from './MetaChecks';
import KeywordCheck from './KeywordCheck';

import { Illo } from '../../../../HomePage/Main/EmptyComponentLayout/illo';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../utils';

import _ from 'lodash';

const BrowserPreview = ({ modifiedData, setIsVisible }) => {
  const { formatMessage } = useIntl();
  const [checked, setChecked] = useState(false);

  const seo = _.get(modifiedData, 'seo', null);
  const metaTitle = _.get(seo, 'metaTitle', null);
  const metaDescription = _.get(seo, 'metaDescription', null);
  const keywords = _.get(seo, 'keywords', null);

  return (
    <ModalLayout
      onClose={() => setIsVisible((prev) => !prev)}
      labelledBy="title"
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {formatMessage({
            id: getTrad('Plugin.name'),
            defaultMessage: 'SEO Plugin',
          })}
        </Typography>
      </ModalHeader>
      <ModalBody>
        <Box paddingTop={2} paddingBottom={4} paddingLeft={4}>
          <Typography variant="beta">
            {formatMessage({
              id: getTrad('Button.browser-preview'),
              defaultMessage: 'Browser Preview',
            })}
          </Typography>
          <Box paddingTop={4}>
            <Divider />
          </Box>
        </Box>

        {seo ? (
          <Stack spacing={2} padding={4}>
            <Box paddingBottom={6}>
              <Box paddingBottom={4}>
                <Switch
                  label="Preview"
                  offLabel="Web"
                  onLabel="Mobile"
                  selected={checked}
                  onChange={() => setChecked((s) => !s)}
                  visibleLabels={true}
                />
              </Box>

              {checked ? (
                <SerpMobile
                  metaTitle={metaTitle}
                  metaDescription={metaDescription}
                />
              ) : (
                <Serp metaTitle={metaTitle} metaDescription={metaDescription} />
              )}
            </Box>

            <Box paddingBottom={6}>
              <Divider />
            </Box>

            {metaTitle && (
              <MetaChecks item={metaTitle} max={60} label="title" />
            )}
            {metaDescription && (
              <MetaChecks
                item={metaDescription}
                max={160}
                label="description"
                minLimit={true}
              />
            )}
            {keywords && (
              <>
                {metaTitle && (
                  <KeywordCheck
                    item={metaTitle}
                    keywords={keywords}
                    label="title"
                  />
                )}

                {metaDescription && (
                  <KeywordCheck
                    item={metaDescription}
                    keywords={keywords}
                    label="description"
                  />
                )}
              </>
            )}
          </Stack>
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
      </ModalBody>
      <ModalFooter />
    </ModalLayout>
  );
};

export default BrowserPreview;
