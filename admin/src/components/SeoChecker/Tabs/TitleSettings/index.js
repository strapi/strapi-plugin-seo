import React, { useState } from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { Switch } from '@strapi/design-system/Switch';
import { Tooltip } from '@strapi/design-system/Tooltip';
import { Divider } from '@strapi/design-system/Divider';
import { TextInput } from '@strapi/design-system/TextInput';

import Information from '@strapi/icons/Information';

import Serp from './Serp';
import SerpMobile from './SerpMobile';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../utils';

import _ from 'lodash';

const TitleSettings = ({ modifiedData }) => {
  const { formatMessage } = useIntl();

  const [checked, setChecked] = useState(false);
  const { onChange } = useCMEditViewDataManager();
  const { metaTitle, metaDescription } = modifiedData.seo;

  const handleChange = (value, name) => {
    onChange({ target: { value, name } });
  };

  return (
    <Box padding={4}>
      <Stack size={6} padding={3}>
        <TextInput
          label="Meta Title"
          name="metaTitle"
          hint={`${(metaTitle && metaTitle.length) || 0}${formatMessage({
            id: getTrad('Title-settings.metaTitle-hint'),
            defaultMessage: '/60 characters (recommended maximum limit)',
          })}`}
          onChange={(e) => handleChange(e.target.value, 'seo.metaTitle')}
          value={metaTitle}
          error={
            metaTitle && metaTitle.length > 60
              ? formatMessage({
                  id: getTrad('Title-settings.metaTitle-too-long'),
                  defaultMessage: 'Meta Title is too long',
                })
              : undefined
          }
          labelAction={
            <Tooltip
              description={formatMessage({
                id: getTrad('Title-settings.metaTitle-tooltip'),
                defaultMessage:
                  'The title tag is the clickable title of a webpage that appears with the result on the SERP (search engine page results page). You should aim to make your SEO titles around 60 characters long. Clear title tags will go a long way towards making your website easy to read and understand.',
              })}
            >
              <button
                aria-label="Meta title"
                style={{
                  border: 'none',
                  padding: 0,
                  background: 'transparent',
                }}
              >
                <Information aria-hidden={true} />
              </button>
            </Tooltip>
          }
        />
        <TextInput
          label="Meta Description"
          name="metaDescription"
          hint={`${
            (metaDescription && metaDescription.length) || 0
          }${formatMessage({
            id: getTrad('Title-settings.metaDescription-hint'),
            defaultMessage: '/160 characters (recommended maximum limit)',
          })}`}
          onChange={(e) => handleChange(e.target.value, 'seo.metaDescription')}
          value={metaDescription}
          error={
            metaDescription && metaDescription.length > 160
              ? formatMessage({
                  id: getTrad('Title-settings.metaTitle-too-long'),
                  defaultMessage: 'Meta Description is too long',
                })
              : undefined
          }
          labelAction={
            <Tooltip
              description={formatMessage({
                id: getTrad('Title-settings.metaDescription-tooltip'),
                defaultMessage:
                  'A meta description is an HTML tag used to describe the content of a web page. This description appears below the title and URL of your page as it appears in search engine results. For it to remain visible in Google, it must not exceed 140-160 characters.',
              })}
            >
              <button
                aria-label="Meta description"
                style={{
                  border: 'none',
                  padding: 0,
                  background: 'transparent',
                }}
              >
                <Information aria-hidden={true} />
              </button>
            </Tooltip>
          }
        />
        <Box padding={1}>
          <Divider />
        </Box>
        <Stack size={3}>
          <Switch
            label="Preview"
            offLabel="Web"
            onLabel="Mobile"
            selected={checked}
            onChange={() => setChecked((s) => !s)}
            visibleLabels={true}
          />
          {checked ? (
            <SerpMobile
              metaTitle={metaTitle}
              metaDescription={metaDescription}
            />
          ) : (
            <Serp metaTitle={metaTitle} metaDescription={metaDescription} />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default TitleSettings;
