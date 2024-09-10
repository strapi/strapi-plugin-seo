import * as React from 'react';
import { useIntl } from 'react-intl';

import { Box, Flex, Switch, Button, Typography, GridLayout, Modal } from '@strapi/design-system';
// TODO fix icons
import { Alien as Equalizer, ArrowDown as InformationSquare } from '@strapi/icons';
import { ContentBox, useNotification } from '@strapi/strapi/admin';

import { getTrad } from '../../../../utils';
import { useSettingsApi } from '../../../../hooks/useSettingsApi';

export const SettingsModal = ({ item }) => {
  const { toggleNotification } = useNotification();
  const { formatMessage } = useIntl();
  const { getSettings, setSettings } = useSettingsApi();

  const [metaTitle, setMetaTitle] = React.useState(true);
  const [metaDescription, setMetaDescription] = React.useState(true);
  const [metaRobots, setMetaRobots] = React.useState(true);
  const [metaSocial, setMetaSocial] = React.useState(true);
  const [wordCount, setWordCount] = React.useState(true);
  const [canonicalUrl, setCanonicalUrl] = React.useState(true);
  const [keywordDensity, setKeywordDensity] = React.useState(true);
  const [structuredData, setStructuredData] = React.useState(true);
  const [alternativeText, setAlternativeText] = React.useState(true);
  const [lastUpdatedAt, setLastUpdatedAt] = React.useState(true);
  const [defaultSettings, setDefaultSettings] = (React.useState < object) | (null > null);
  const [isVisible, setIsVisible] = React.useState < boolean > false;

  React.useEffect(() => {
    const fetchDefaultSettings = async () => {
      const tmpSettings = await getSettings();

      setDefaultSettings(tmpSettings);
    };
    fetchDefaultSettings();
  }, []);

  const handleOpeningModal = () => {
    const seoChecks = defaultSettings?.[item?.uid]?.seoChecks;
    if (!seoChecks) {
      return;
    }

    setMetaTitle(seoChecks?.metaTitle);
    setMetaDescription(seoChecks?.metaDescription);
    setMetaRobots(seoChecks?.metaRobots);
    setMetaSocial(seoChecks?.metaSocial);
    setWordCount(seoChecks?.wordCount);
    setCanonicalUrl(seoChecks?.canonicalUrl);
    setKeywordDensity(seoChecks?.keywordDensity);
    setStructuredData(seoChecks?.structuredData);
    setAlternativeText(seoChecks?.alternativeText);
    setLastUpdatedAt(seoChecks?.lastUpdatedAt);

    setIsVisible((prev) => !prev);
  };

  const handleSavingSettingsModal = () => {
    if (!defaultSettings) {
      return;
    }

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

    setSettings(newSettings).then(async () => {
      setDefaultSettings(newSettings);
      setIsVisible((prev) => !prev);
    });

    // NEED LOCALE
    toggleNotification({
      type: 'success',
      message: formatMessage({
        id: 'notification.success.settings',
        defaultMessage: `Settings saved for ${
          defaultSettings[item?.uid]?.collectionName
        } content-type.`,
      }),
    });
  };

  return (
    <>
      <Button variant="tertiary" startIcon={<Equalizer />} onClick={() => handleOpeningModal()}>
        {formatMessage({
          id: getTrad('SEOPage.info.config'),
          defaultMessage: 'Settings',
        })}
      </Button>
      {isVisible && (
        <Modal.Content onClose={() => setIsVisible((prev) => !prev)} labelledBy="title">
          <Modal.Header>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
              {formatMessage({
                id: getTrad('SEOPage.info.settings'),
                defaultMessage: 'Settings',
              })}
            </Typography>
          </Modal.Header>
          <Modal.Body>
            <Box paddingBottom={8} paddingTop={4}>
              <ContentBox
                title={formatMessage({
                  id: 'Information',
                  defaultMessage: 'Information',
                })}
                subtitle={formatMessage({
                  id: getTrad('HomePage.info.settings.information'),
                  defaultMessage: 'Disable SEO checks for this specific content-type.',
                })}
                icon={<InformationSquare />}
                iconBackground="primary100"
              />
            </Box>
            <GridLayout>
              <Box padding={4} hasRadius background="neutral0" shadow="tableShadow">
                <Flex horizontal spacing={4} padding={3}>
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
                </Flex>
              </Box>
              <Box padding={4} hasRadius background="neutral0" shadow="tableShadow">
                <Flex horizontal spacing={4} padding={3}>
                  <Switch
                    label="Switch"
                    selected={metaDescription}
                    onChange={() => setMetaDescription((s) => !s)}
                  />
                  <Typography variant="delta">
                    {formatMessage({
                      id: getTrad('SEOPage.info.settings.meta-description-check'),
                      defaultMessage: 'Meta Description',
                    })}
                  </Typography>
                </Flex>
              </Box>
              <Box padding={4} hasRadius background="neutral0" shadow="tableShadow">
                <Flex horizontal spacing={4} padding={3}>
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
                </Flex>
              </Box>
              <Box padding={4} hasRadius background="neutral0" shadow="tableShadow">
                <Flex horizontal spacing={4} padding={3}>
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
                </Flex>
              </Box>
              <Box padding={4} hasRadius background="neutral0" shadow="tableShadow">
                <Flex horizontal spacing={4} padding={3}>
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
                </Flex>
              </Box>
              <Box padding={4} hasRadius background="neutral0" shadow="tableShadow">
                <Flex horizontal spacing={4} padding={3}>
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
                </Flex>
              </Box>
              <Box padding={4} hasRadius background="neutral0" shadow="tableShadow">
                <Flex horizontal spacing={4} padding={3}>
                  <Switch
                    label="Switch"
                    selected={keywordDensity}
                    onChange={() => setKeywordDensity((s) => !s)}
                  />
                  <Typography variant="delta">
                    {formatMessage({
                      id: getTrad('SEOPage.info.settings.keyword-density-check'),
                      defaultMessage: 'Keyword Density',
                    })}
                  </Typography>
                </Flex>
              </Box>
              <Box padding={4} hasRadius background="neutral0" shadow="tableShadow">
                <Flex horizontal spacing={4} padding={3}>
                  <Switch
                    label="Switch"
                    selected={structuredData}
                    onChange={() => setStructuredData((s) => !s)}
                  />
                  <Typography variant="delta">
                    {formatMessage({
                      id: getTrad('SEOPage.info.settings.structured-data-check'),
                      defaultMessage: 'Structured Data',
                    })}
                  </Typography>
                </Flex>
              </Box>
              <Box padding={4} hasRadius background="neutral0" shadow="tableShadow">
                <Flex horizontal spacing={4} padding={3}>
                  <Switch
                    label="Switch"
                    selected={alternativeText}
                    onChange={() => setAlternativeText((s) => !s)}
                  />
                  <Typography variant="delta">
                    {formatMessage({
                      id: getTrad('SEOPage.info.settings.alternative-text-check'),
                      defaultMessage: 'Alt Text',
                    })}
                  </Typography>
                </Flex>
              </Box>
              <Box padding={4} hasRadius background="neutral0" shadow="tableShadow">
                <Flex horizontal spacing={4} padding={3}>
                  <Switch
                    label="Switch"
                    selected={lastUpdatedAt}
                    onChange={() => setLastUpdatedAt((s) => !s)}
                  />
                  <Typography variant="delta">
                    {formatMessage({
                      id: getTrad('SEOPage.info.settings.last-updated-at-check'),
                      defaultMessage: 'Last Updated At',
                    })}
                  </Typography>
                </Flex>
              </Box>
            </GridLayout>
          </Modal.Body>
          <Modal.Footer
            startActions={
              <Button onClick={() => setIsVisible((prev) => !prev)} variant="tertiary">
                {formatMessage({
                  id: getTrad('SEOPage.info.settings.cancel.button'),
                  defaultMessage: 'Cancel',
                })}
              </Button>
            }
            endActions={
              <>
                <Button onClick={() => handleSavingSettingsModal()}>
                  {formatMessage({
                    id: getTrad('SEOPage.info.settings.save.button'),
                    defaultMessage: 'Save',
                  })}
                </Button>
              </>
            }
          />
        </Modal.Content>
      )}
    </>
  );
};
