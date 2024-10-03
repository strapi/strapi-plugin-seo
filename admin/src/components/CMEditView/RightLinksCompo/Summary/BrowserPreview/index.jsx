import * as React from 'react';
import { useIntl } from 'react-intl';

import get from 'lodash/get';

import {
  Box,
  Flex,
  Switch,
  Divider,
  Typography,
  EmptyStateLayout,
  Modal,
} from '@strapi/design-system';

import { Serp } from './Serp';
import { SerpMobile } from './SerpMobile';
import { MetaChecks } from './MetaChecks';
import { KeywordCheck } from './KeywordCheck';

import { Illo } from '../../../../HomePage/Main/EmptyComponentLayout/illo';

import { getTrad } from '../../../../../utils/getTrad';

export const BrowserPreview = ({ modifiedData }) => {
  const { formatMessage } = useIntl();
  const [checked, setChecked] = React.useState(false);

  const seo = get(modifiedData, 'seo', null);
  const metaTitle = get(seo, 'metaTitle', null);
  const metaDescription = get(seo, 'metaDescription', null);
  const keywords = get(seo, 'keywords', null);

  return (
    <Modal.Content labelledBy="title">
      <Modal.Header>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {formatMessage({
            id: getTrad('Button.browser-preview'),
            defaultMessage: 'Browser Preview',
          })}
        </Typography>
      </Modal.Header>
      <Modal.Body>
        {seo ? (
          <Flex direction="column" gap={2} alignItems="flex-start">
            <Box paddingBottom={6}>
              <Box paddingBottom={4}>
                <Switch
                  label="Preview"
                  offLabel="Web"
                  onLabel="Mobile"
                  selected={checked}
                  onCheckedChange={() => setChecked((s) => !s)}
                  visibleLabels={true}
                />
              </Box>

              {checked ? (
                <SerpMobile metaTitle={metaTitle} metaDescription={metaDescription} />
              ) : (
                <Serp metaTitle={metaTitle} metaDescription={metaDescription} />
              )}
            </Box>

            <Divider marginBottom={4} width="100%" />

            {metaTitle && <MetaChecks item={metaTitle} max={60} label="title" />}
            {metaDescription && (
              <MetaChecks item={metaDescription} max={160} label="description" minLimit={true} />
            )}
            {keywords && (
              <React.Fragment>
                {metaTitle && <KeywordCheck item={metaTitle} keywords={keywords} label="title" />}

                {metaDescription && (
                  <KeywordCheck item={metaDescription} keywords={keywords} label="description" />
                )}
              </React.Fragment>
            )}
          </Flex>
        ) : (
          <Box paddingLeft={4}>
            <EmptyStateLayout
              icon={<Illo />}
              content={formatMessage({
                id: getTrad('Modal.seo-component-empty'),
                defaultMessage: 'Your SEO component is empty...',
              })}
            />
          </Box>
        )}
      </Modal.Body>
    </Modal.Content>
  );
};
