import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import _ from 'lodash';

import {
  Box,
  Flex,
  Switch,
  Divider,
  Typography,
  EmptyStateLayout,
  Modal,
} from '@strapi/design-system';

import Serp from './Serp';
import SerpMobile from './SerpMobile';
import MetaChecks from './MetaChecks';
import KeywordCheck from './KeywordCheck';

import { Illo } from '../../../../HomePage/Main/EmptyComponentLayout/illo';

import { getTrad } from '../../../../../utils/getTrad';

const BrowserPreview = ({ modifiedData, setIsVisible }) => {
  const { formatMessage } = useIntl();
  const [checked, setChecked] = useState(false);

  const seo = _.get(modifiedData, 'seo', null);
  const metaTitle = _.get(seo, 'metaTitle', null);
  const metaDescription = _.get(seo, 'metaDescription', null);
  const keywords = _.get(seo, 'keywords', null);

  return (
    <Modal.Body onClose={() => setIsVisible((prev) => !prev)} labelledBy="title">
      <Modal.Header>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {formatMessage({
            id: getTrad('Plugin.name'),
            defaultMessage: 'SEO Plugin',
          })}
        </Typography>
      </Modal.Header>
      <Modal.Content>
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
          <Flex spacing={2} padding={4}>
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
                <SerpMobile metaTitle={metaTitle} metaDescription={metaDescription} />
              ) : (
                <Serp metaTitle={metaTitle} metaDescription={metaDescription} />
              )}
            </Box>

            <Box paddingBottom={6}>
              <Divider />
            </Box>

            {metaTitle && <MetaChecks item={metaTitle} max={60} label="title" />}
            {metaDescription && (
              <MetaChecks item={metaDescription} max={160} label="description" minLimit={true} />
            )}
            {keywords && (
              <>
                {metaTitle && <KeywordCheck item={metaTitle} keywords={keywords} label="title" />}

                {metaDescription && (
                  <KeywordCheck item={metaDescription} keywords={keywords} label="description" />
                )}
              </>
            )}
          </Flex>
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
      </Modal.Content>
      <Modal.Footer />
    </Modal.Body>
  );
};

export default BrowserPreview;
