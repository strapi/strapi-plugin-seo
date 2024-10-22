import * as React from 'react';
import { useIntl } from 'react-intl';

import {
  unstable_useContentManagerContext as useContentManagerContext,
  unstable_useDocument as useDocument,
} from '@strapi/strapi/admin';
import { Box, Button, Divider, Typography, TextButton, Modal } from '@strapi/design-system';
import { Eye, ArrowRight } from '@strapi/icons';

import { reducer } from './reducer';

import { SeoChecks } from '../SeoChecks';
import { SocialPreview } from './SocialPreview';
import { PreviewChecks } from './PreviewChecks';
import { BrowserPreview } from './BrowserPreview';

import { getTrad } from '../../../../utils/getTrad';
import { useSettingsApi } from '../../../../hooks/useSettingsApi';
import { getRichTextCheck } from '../../utils/index';
import {
  canonicalUrlPreview,
  getAlternativeTextPreview,
  getKeywordDensityPreview,
  getMetaDescriptionPreview,
  getMetaTitleCheckPreview,
  getWordCountPreview,
  lastUpdatedAtPreview,
  metaRobotPreview,
  metaSocialPreview,
  structuredDataPreview,
} from '../../utils/checks';

const initialState = {
  preview: true,
};

export const SeoCheckerContext = React.createContext(null);

export const Summary = () => {
  const { formatMessage } = useIntl();
  const { getSettings } = useSettingsApi();

  const [isLoading, setIsLoading] = React.useState(true);
  const [localChecks, setLocalChecks] = React.useState({});
  const [manualCheck, setManualCheck] = React.useState(false);

  const [checks, dispatch] = React.useReducer(reducer, initialState);

  const { model, collectionType, id, form, contentType, components } = useContentManagerContext();
  const { values: modifiedData } = form;

  const { document } = useDocument({
    model,
    collectionType,
    documentId: id,
  });

  const getAllChecks = async (modifiedData, components, contentType) => {
    const { data: defaultSettings } = await getSettings();

    const { wordCount, keywordsDensity, emptyAltCount } = getRichTextCheck(
      modifiedData,
      components,
      contentType
    );

    let result = {
      ...(defaultSettings[contentType?.uid]?.seoChecks?.metaTitle && {
        metaTitle: getMetaTitleCheckPreview(modifiedData),
      }),
      ...(defaultSettings[contentType?.uid]?.seoChecks?.wordCount && {
        wordCount: getWordCountPreview(wordCount),
      }),
      ...(defaultSettings[contentType?.uid]?.seoChecks?.metaRobots && {
        metaRobots: metaRobotPreview(modifiedData),
      }),
      ...(defaultSettings[contentType?.uid]?.seoChecks?.metaSocial && {
        metaSocial: metaSocialPreview(modifiedData),
      }),
      ...(defaultSettings[contentType?.uid]?.seoChecks?.canonicalUrl && {
        canonicalUrl: canonicalUrlPreview(modifiedData),
      }),
      ...(defaultSettings[contentType?.uid]?.seoChecks?.lastUpdatedAt && {
        lastUpdatedAt: lastUpdatedAtPreview(modifiedData),
      }),
      ...(defaultSettings[contentType?.uid]?.seoChecks?.structuredData && {
        structuredData: structuredDataPreview(modifiedData),
      }),
      ...(defaultSettings[contentType?.uid]?.seoChecks?.metaDescription && {
        metaDescription: getMetaDescriptionPreview(modifiedData),
      }),
      ...(defaultSettings[contentType?.uid]?.seoChecks?.alternativeText && {
        alternativeText: getAlternativeTextPreview(emptyAltCount),
      }),
      ...(defaultSettings[contentType?.uid]?.seoChecks?.keywordDensity && {
        keywordsDensity: getKeywordDensityPreview(keywordsDensity),
      }),
    };

    return result;
  };

  const fetchChecks = async (manualCheck = false) => {
    if (manualCheck || !(JSON.stringify(localChecks) === JSON.stringify(checks))) {
      setIsLoading(true);
      const status = await getAllChecks(modifiedData, components, contentType);

      dispatch({
        type: 'UPDATE_FOR_PREVIEW',
        value: status,
      });

      setLocalChecks(checks);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchChecks();
  }, [checks, modifiedData, components, contentType]);

  React.useEffect(() => {
    if (manualCheck) {
      fetchChecks(true);
      setManualCheck(false);
    }
  }, [manualCheck, fetchChecks]);

  return (
    <SeoCheckerContext.Provider value={dispatch}>
      <Box paddingTop={4} width="100%">
        <Typography tag="h2" variant="sigma" textTransform="uppercase" textColor="neutral600">
          {formatMessage({
            id: getTrad('Plugin.name'),
            defaultMessage: 'SEO Plugin',
          })}
        </Typography>

        <Modal.Root>
          <Modal.Trigger>
            <Box paddingTop={1}>
              <Button fullWidth variant="secondary" startIcon={<Eye />}>
                {formatMessage({
                  id: getTrad('Button.browser-preview'),
                  defaultMessage: 'Browser Preview',
                })}
              </Button>
            </Box>
          </Modal.Trigger>
          <BrowserPreview modifiedData={modifiedData} />
        </Modal.Root>

        <Modal.Root>
          <Modal.Trigger>
            <Box paddingTop={2}>
              <Button fullWidth variant="secondary" startIcon={<Eye />}>
                {formatMessage({
                  id: getTrad('Button.social-preview'),
                  defaultMessage: 'Social Preview',
                })}
              </Button>
            </Box>
          </Modal.Trigger>
          <SocialPreview modifiedData={modifiedData} />
        </Modal.Root>

        {!isLoading && <PreviewChecks checks={checks} />}

        <Box paddingTop={4}>
          <Button fullWidth variant="secondary" onClick={() => setManualCheck(true)}>
            {formatMessage({
              id: getTrad('Button.manual-recheck'),
              defaultMessage: 'Manual Re-check',
            })}
          </Button>
        </Box>

        <Modal.Root>
          <Modal.Trigger>
            <Box paddingTop={4}>
              <TextButton startIcon={<ArrowRight />}>
                {formatMessage({
                  id: getTrad('Button.see-details'),
                  defaultMessage: 'SEE DETAILS',
                })}
              </TextButton>
            </Box>
          </Modal.Trigger>
          <SeoChecks
            updatedAt={document?.updatedAt ?? null}
            modifiedData={modifiedData}
            components={components}
            contentType={contentType}
            checks={checks}
          />
        </Modal.Root>
      </Box>
    </SeoCheckerContext.Provider>
  );
};
