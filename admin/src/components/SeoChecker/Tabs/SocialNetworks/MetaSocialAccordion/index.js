import React, { useState } from 'react';

import {
  Accordion,
  AccordionToggle,
  AccordionContent,
} from '@strapi/design-system/Accordion';

import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { Stack } from '@strapi/design-system/Stack';
import { Divider } from '@strapi/design-system/Divider';
import { TextInput } from '@strapi/design-system/TextInput';

import FacebookPreview from './FacebookPreview';
import TwitterPreview from './TwitterPreview';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../utils';

import { useCMEditViewDataManager } from '@strapi/helper-plugin';

const MetaSocialAccordion = ({ item, index }) => {
  const { formatMessage } = useIntl();

  const [expanded, setExpanded] = useState(false);
  const { onChange } = useCMEditViewDataManager();

  const { title, description, socialNetwork, image } = item;

  const handleChange = (value, name) => {
    onChange({ target: { value, name } });
  };

  return (
    <Accordion
      expanded={expanded}
      toggle={() => setExpanded((s) => !s)}
      id="acc-1"
    >
      <AccordionToggle
        title={socialNetwork}
        description={`${formatMessage({
          id: getTrad('Social-network.accordion.description'),
          defaultMessage: 'See how your content will look like on',
        })} ${socialNetwork}`}
      />
      <AccordionContent>
        <Box padding={4}>
          <Stack size={6} padding={3}>
            <TextInput
              label="Title"
              name="title"
              hint={`${title && title.length}${formatMessage({
                id: getTrad('Social-network.metaTitle-hint'),
                defaultMessage: '/60 characters (recommended maximum limit)',
              })}`}
              error={
                title.length > 60
                  ? formatMessage({
                      id: getTrad('Title-settings.metaTitle-too-long'),
                      defaultMessage: 'Meta Title is too long',
                    })
                  : undefined
              }
              onChange={(e) =>
                handleChange(e.target.value, `seo.metaSocial.${index}.title`)
              }
              value={title}
            />

            <TextInput
              label="Description"
              name="description"
              hint={`${description && description.length}${formatMessage({
                id: getTrad('Social-network.metaDescription-hint'),
                defaultMessage: '/65 characters (recommended maximum limit)',
              })}`}
              error={
                description.length > 125
                  ? formatMessage({
                      id: getTrad('Title-settings.metaDescription-too-long'),
                      defaultMessage: 'Meta Description is too long',
                    })
                  : undefined
              }
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  `seo.metaSocial.${index}.description`
                )
              }
              value={description}
            />

            <Box padding={1}>
              <Divider />
            </Box>

            <Flex alignItems="center" justifyContent="center">
              {socialNetwork === 'Facebook' ? (
                <FacebookPreview
                  title={title}
                  description={description}
                  image={image}
                />
              ) : (
                <TwitterPreview
                  title={title}
                  description={description}
                  image={image}
                />
              )}
            </Flex>
          </Stack>
        </Box>
      </AccordionContent>
    </Accordion>
  );
};

export default MetaSocialAccordion;
