import * as React from 'react';
import { useIntl } from 'react-intl';

import { Box, Flex, Typography, EmptyStateLayout, Badge, Modal } from '@strapi/design-system';

import { Illo } from '../../../../HomePage/Main/EmptyComponentLayout/illo';

import { getTrad } from '../../../../../utils/getTrad';
import { FacebookOGPreview } from './Facebook/index';
import { TwitterOGPreview } from './X/index';
import { LinkedInOGPreview } from './LinkedIn/index';

export const OpenGraphPreview = ({ modifiedData }) => {
  const { formatMessage } = useIntl();

  const { openGraph } = modifiedData?.seo;

  return (
    <Modal.Content labelledBy="title">
      <Modal.Header>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {formatMessage({
            id: getTrad('Button.open-graph-preview'),
            defaultMessage: 'Open Graph Preview',
          })}
        </Typography>
      </Modal.Header>
      <Modal.Body>
        {openGraph['og:title'] && openGraph['og:description'] && openGraph['og:image'] ? (
          <>
            <Flex alignItems="left" direction="column" gap={2}>
              <Flex gap={1}>
                <Badge backgroundColor="neutral150" textColor="neutral600">
                  Facebook
                </Badge>
              </Flex>
            </Flex>
            <FacebookOGPreview
              title={openGraph['og:title']}
              description={openGraph['og:description']}
              image={openGraph['og:image']}
            />
            <Flex alignItems="left" direction="column" gap={2}>
              <Flex gap={1}>
                <Badge backgroundColor="neutral150" textColor="neutral600">
                  X (Twitter)
                </Badge>
              </Flex>
            </Flex>
            <TwitterOGPreview
              title={openGraph['og:title']}
              description={openGraph['og:description']}
              image={openGraph['og:image']}
            />
            <Flex alignItems="left" direction="column" gap={2}>
              <Flex gap={1}>
                <Badge backgroundColor="neutral150" textColor="neutral600">
                  LinkedIn
                </Badge>
              </Flex>
            </Flex>
            <LinkedInOGPreview
              title={openGraph['og:title']}
              description={openGraph['og:description']}
              image={openGraph['og:image']}
            />
          </>
        ) : (
          <Box paddingLeft={4}>
            <EmptyStateLayout
              icon={<Illo />}
              content={formatMessage({
                id: getTrad('Modal.seo-component-empty-open-graph'),
                defaultMessage: 'The Open Graph metadata is empty...',
              })}
            />
          </Box>
        )}
      </Modal.Body>
    </Modal.Content>
  );
};
