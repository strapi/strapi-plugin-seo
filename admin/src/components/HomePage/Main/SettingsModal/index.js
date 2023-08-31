import React, { useState, useEffect } from 'react';

import { Box } from '@strapi/design-system';
import { Stack } from '@strapi/design-system';
import { Switch } from '@strapi/design-system/Switch';
import { Button } from '@strapi/design-system/Button';
import { Typography } from '@strapi/design-system/Typography';
import { GridLayout } from '@strapi/design-system';

import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@strapi/design-system';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../utils';

import Equalizer from '@strapi/icons/Equalizer';
import InformationSquare from '@strapi/icons/InformationSquare';

import { ContentBox, useNotification } from '@strapi/helper-plugin';

const settingsAPI = require('../../../../api/settings').default;

const SettingsModal = ({ item }) => {
  const toggleNotification = useNotification();

  const [metaTitle, setMetaTitle] = useState(true);
  const [metaDescription, setMetaDescription] = useState(true);
  const [metaRobots, setMetaRobots] = useState(true);
  const [metaSocial, setMetaSocial] = useState(true);
  const [wordCount, setWordCount] = useState(true);
  const [canonicalUrl, setCanonicalUrl] = useState(true);
  const [keywordDensity, setKeywordDensity] = useState(true);
  const [structuredData, setStructuredData] = useState(true);
  const [alternativeText, setAlternativeText] = useState(true);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(true);

  const [defaultSettings, setDefaultSettings] = useState(null);

  const [isVisible, setIsVisible] = useState(false);
  const { formatMessage } = useIntl();

  useEffect(() => {
    const fetchDefaultSettings = async () => {
      const tmpSettings = await settingsAPI.get();
      setDefaultSettings(tmpSettings);
    };
    fetchDefaultSettings();
  }, []);

  const handleOpeningModal = (prev) => {
    const matchingContentType = defaultSettings[item?.uid];

    setMetaTitle(matchingContentType?.seoChecks?.metaTitle);
    setMetaDescription(matchingContentType?.seoChecks?.metaDescription);
    setMetaRobots(matchingContentType?.seoChecks?.metaRobots);
    setMetaSocial(matchingContentType?.seoChecks?.metaSocial);
    setWordCount(matchingContentType?.seoChecks?.wordCount);
    setCanonicalUrl(matchingContentType?.seoChecks?.canonicalUrl);
    setKeywordDensity(matchingContentType?.seoChecks?.keywordDensity);
    setStructuredData(matchingContentType?.seoChecks?.structuredData);
    setAlternativeText(matchingContentType?.seoChecks?.alternativeText);
    setLastUpdatedAt(matchingContentType?.seoChecks?.lastUpdatedAt);

    setIsVisible((prev) => !prev);
  };

  const handleSavingSettingsModal = (prev) => {
    const newSettings = {
      ...defaultSettings,
      [item?.uid]: {
        collectionName: defaultSettings[item?.uid]?.collectionName,
        seoChecks: {
          metaTitle,
          metaDescription,
          metaRobots,
          metaSocial,
          wordCount,
          canonicalUrl,
          keywordDensity,
          structuredData,
          alternativeText,
          lastUpdatedAt,
        },
      },
    };

    settingsAPI.set(newSettings).then(async () => {
      setDefaultSettings(newSettings);
      setIsVisible((prev) => !prev);
    });

    // NEED LOCALE
    toggleNotification({
      type: 'success',
      message: {
        id: 'notification.success.settings',
        defaultMessage: `Settings saved for ${
          defaultSettings[item?.uid]?.collectionName
        } content-type.`,
      },
    });
  };

  return (
    <>
      <Button
        variant="tertiary"
        startIcon={<Equalizer />}
        onClick={(prev) => handleOpeningModal(prev)}
      >
        {formatMessage({
          id: getTrad('SEOPage.info.config'),
          defaultMessage: 'Settings',
        })}
      </Button>
      {isVisible && (
        <ModalLayout
          onClose={() => setIsVisible((prev) => !prev)}
          labelledBy="title"
        >
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              {formatMessage({
                id: getTrad('SEOPage.info.settings'),
                defaultMessage: 'Settings',
              })}
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Box paddingBottom={8} paddingTop={4}>
              <ContentBox
                title={formatMessage({
                  id: 'Information',
                  defaultMessage: 'Information',
                })}
                subtitle={formatMessage({
                  id: getTrad('HomePage.info.settings.information'),
                  defaultMessage:
                    'Disable SEO checks for this specific content-type.',
                })}
                icon={<InformationSquare />}
                iconBackground="primary100"
              />
            </Box>
            <GridLayout>
              <Box
                padding={4}
                hasRadius
                background="neutral0"
                shadow="tableShadow"
              >
                <Stack horizontal spacing={4} padding={3}>
                  <Switch
                    label="Switch"
                    selected={metaTitle}
                    onChange={() => setMetaTitle((s) => !s)}
                  />
                  <Typography variant="delta">
                    {formatMessage({
                      id: getTrad('SEOPage.info.settings.meta-title-check'),
                      defaultMessage: 'Meta Title',
                    })}
                  </Typography>
                </Stack>
              </Box>
              <Box
                padding={4}
                hasRadius
                background="neutral0"
                shadow="tableShadow"
              >
                <Stack horizontal spacing={4} padding={3}>
                  <Switch
                    label="Switch"
                    selected={metaDescription}
                    onChange={() => setMetaDescription((s) => !s)}
                  />
                  <Typography variant="delta">
                    {formatMessage({
                      id: getTrad(
                        'SEOPage.info.settings.meta-description-check'
                      ),
                      defaultMessage: 'Meta Description',
                    })}
                  </Typography>
                </Stack>
              </Box>
              <Box
                padding={4}
                hasRadius
                background="neutral0"
                shadow="tableShadow"
              >
                <Stack horizontal spacing={4} padding={3}>
                  <Switch
                    label="Switch"
                    selected={metaRobots}
                    onChange={() => setMetaRobots((s) => !s)}
                  />
                  <Typography variant="delta">
                    {formatMessage({
                      id: getTrad('SEOPage.info.settings.meta-robots-check'),
                      defaultMessage: 'Meta Robots',
                    })}
                  </Typography>
                </Stack>
              </Box>
              <Box
                padding={4}
                hasRadius
                background="neutral0"
                shadow="tableShadow"
              >
                <Stack horizontal spacing={4} padding={3}>
                  <Switch
                    label="Switch"
                    selected={metaSocial}
                    onChange={() => setMetaSocial((s) => !s)}
                  />
                  <Typography variant="delta">
                    {formatMessage({
                      id: getTrad('SEOPage.info.settings.meta-social-check'),
                      defaultMessage: 'Meta Social',
                    })}
                  </Typography>
                </Stack>
              </Box>
              <Box
                padding={4}
                hasRadius
                background="neutral0"
                shadow="tableShadow"
              >
                <Stack horizontal spacing={4} padding={3}>
                  <Switch
                    label="Switch"
                    selected={wordCount}
                    onChange={() => setWordCount((s) => !s)}
                  />
                  <Typography variant="delta">
                    {formatMessage({
                      id: getTrad('SEOPage.info.settings.word-count-check'),
                      defaultMessage: 'Word Count',
                    })}
                  </Typography>
                </Stack>
              </Box>
              <Box
                padding={4}
                hasRadius
                background="neutral0"
                shadow="tableShadow"
              >
                <Stack horizontal spacing={4} padding={3}>
                  <Switch
                    label="Switch"
                    selected={canonicalUrl}
                    onChange={() => setCanonicalUrl((s) => !s)}
                  />
                  <Typography variant="delta">
                    {formatMessage({
                      id: getTrad('SEOPage.info.settings.canonical-url-check'),
                      defaultMessage: 'Canonical URL',
                    })}
                  </Typography>
                </Stack>
              </Box>
              <Box
                padding={4}
                hasRadius
                background="neutral0"
                shadow="tableShadow"
              >
                <Stack horizontal spacing={4} padding={3}>
                  <Switch
                    label="Switch"
                    selected={keywordDensity}
                    onChange={() => setKeywordDensity((s) => !s)}
                  />
                  <Typography variant="delta">
                    {formatMessage({
                      id: getTrad(
                        'SEOPage.info.settings.keyword-density-check'
                      ),
                      defaultMessage: 'Keyword Density',
                    })}
                  </Typography>
                </Stack>
              </Box>
              <Box
                padding={4}
                hasRadius
                background="neutral0"
                shadow="tableShadow"
              >
                <Stack horizontal spacing={4} padding={3}>
                  <Switch
                    label="Switch"
                    selected={structuredData}
                    onChange={() => setStructuredData((s) => !s)}
                  />
                  <Typography variant="delta">
                    {formatMessage({
                      id: getTrad(
                        'SEOPage.info.settings.structured-data-check'
                      ),
                      defaultMessage: 'Structured Data',
                    })}
                  </Typography>
                </Stack>
              </Box>
              <Box
                padding={4}
                hasRadius
                background="neutral0"
                shadow="tableShadow"
              >
                <Stack horizontal spacing={4} padding={3}>
                  <Switch
                    label="Switch"
                    selected={alternativeText}
                    onChange={() => setAlternativeText((s) => !s)}
                  />
                  <Typography variant="delta">
                    {formatMessage({
                      id: getTrad(
                        'SEOPage.info.settings.alternative-text-check'
                      ),
                      defaultMessage: 'Alt Text',
                    })}
                  </Typography>
                </Stack>
              </Box>
              <Box
                padding={4}
                hasRadius
                background="neutral0"
                shadow="tableShadow"
              >
                <Stack horizontal spacing={4} padding={3}>
                  <Switch
                    label="Switch"
                    selected={lastUpdatedAt}
                    onChange={() => setLastUpdatedAt((s) => !s)}
                  />
                  <Typography variant="delta">
                    {formatMessage({
                      id: getTrad(
                        'SEOPage.info.settings.last-updated-at-check'
                      ),
                      defaultMessage: 'Last Updated At',
                    })}
                  </Typography>
                </Stack>
              </Box>
            </GridLayout>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button
                onClick={() => setIsVisible((prev) => !prev)}
                variant="tertiary"
              >
                {formatMessage({
                  id: getTrad('SEOPage.info.settings.cancel.button'),
                  defaultMessage: 'Cancel',
                })}
              </Button>
            }
            endActions={
              <>
                <Button onClick={(prev) => handleSavingSettingsModal(prev)}>
                  {formatMessage({
                    id: getTrad('SEOPage.info.settings.save.button'),
                    defaultMessage: 'Save',
                  })}
                </Button>
              </>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default SettingsModal;
