import React, { useEffect, useState, useReducer, createContext } from 'react';
import { useIntl } from 'react-intl';

import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';
import { Box, Button, Divider, Typography, TextButton } from '@strapi/design-system';
import { Eye, ArrowRight } from '@strapi/icons';

import reducer from './reducer';

import SeoChecks from '../SeoChecks';
import SocialPreview from './SocialPreview';
import PreviewChecks from './PreviewChecks';
import BrowserPreview from './BrowserPreview';

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

export const SeoCheckerContext = createContext(null);

const Summary = () => {
  const { formatMessage } = useIntl();
  const { getSettings } = useSettingsApi();

  const [isLoading, setIsLoading] = useState(true);
  const [isBrowserPreviewVisible, setIsBrowserPreviewVisible] = useState(false);
  const [isSocialPreviewVisible, setIsSocialPreviewVisible] = useState(false);
  const [isSeoChecksVisible, setIsSeoChecksVisible] = useState(false);
  const [localChecks, setLocalChecks] = useState({});
  const [checks, dispatch] = useReducer(reducer, initialState);

  const { layout, form, model: contentType } = useContentManagerContext();

  const {
    edit: { components },
  } = layout;
  const { modifiedData } = form;

  const getAllChecks = async (layout, modifiedData, components, contentType) => {
    const defaultSettings = await getSettings();

    const { wordCount, keywordsDensity, emptyAltCount } = getRichTextCheck(
      modifiedData,
      components,
      contentType
    );

    let result = {
      ...(defaultSettings[layout?.uid]?.seoChecks?.metaTitle && {
        metaTitle: getMetaTitleCheckPreview(modifiedData),
      }),
      ...(defaultSettings[layout?.uid]?.seoChecks?.wordCount && {
        wordCount: getWordCountPreview(wordCount),
      }),
      ...(defaultSettings[layout?.uid]?.seoChecks?.metaRobots && {
        metaRobots: metaRobotPreview(modifiedData),
      }),
      ...(defaultSettings[layout?.uid]?.seoChecks?.metaSocial && {
        metaSocial: metaSocialPreview(modifiedData),
      }),
      ...(defaultSettings[layout?.uid]?.seoChecks?.canonicalUrl && {
        canonicalUrl: canonicalUrlPreview(modifiedData),
      }),
      ...(defaultSettings[layout?.uid]?.seoChecks?.lastUpdatedAt && {
        lastUpdatedAt: lastUpdatedAtPreview(modifiedData),
      }),
      ...(defaultSettings[layout?.uid]?.seoChecks?.structuredData && {
        structuredData: structuredDataPreview(modifiedData),
      }),
      ...(defaultSettings[layout?.uid]?.seoChecks?.metaDescription && {
        metaDescription: getMetaDescriptionPreview(modifiedData),
      }),
      ...(defaultSettings[layout?.uid]?.seoChecks?.alternativeText && {
        alternativeText: getAlternativeTextPreview(emptyAltCount),
      }),
      ...(defaultSettings[layout?.uid]?.seoChecks?.keywordDensity && {
        keywordsDensity: getKeywordDensityPreview(keywordsDensity),
      }),
    };

    return result;
  };

  useEffect(() => {
    const fetchChecks = async () => {
      if (!(JSON.stringify(localChecks) === JSON.stringify(checks))) {
        if (checks?.preview) {
          const status = await getAllChecks(layout, modifiedData, components, contentType);
          dispatch({
            type: 'UPDATE_FOR_PREVIEW',
            value: status,
          });
        } else
          dispatch({
            type: 'UPDATE_FOR_PREVIEW',
            value: checks,
          });
        setLocalChecks(checks);
      }
    };

    fetchChecks().then(() => {
      setIsLoading(false);
    });
  }, [checks]);

  return (
    <SeoCheckerContext.Provider value={dispatch}>
      <Box>
        <Typography variant="sigma" textColor="neutral600" id="seo">
          {formatMessage({
            id: getTrad('Plugin.name'),
            defaultMessage: 'SEO Plugin',
          })}
        </Typography>
        <Box paddingTop={2} paddingBottom={6}>
          <Divider />
        </Box>
        <Box paddingTop={1}>
          <Button
            fullWidth
            variant="secondary"
            startIcon={<Eye />}
            onClick={() => setIsBrowserPreviewVisible((prev) => !prev)}
          >
            {formatMessage({
              id: getTrad('Button.browser-preview'),
              defaultMessage: 'Browser Preview',
            })}
          </Button>
        </Box>

        <Box paddingTop={2}>
          <Button
            fullWidth
            variant="secondary"
            startIcon={<Eye />}
            onClick={() => setIsSocialPreviewVisible((prev) => !prev)}
          >
            {formatMessage({
              id: getTrad('Button.social-preview'),
              defaultMessage: 'Social Preview',
            })}
          </Button>
        </Box>

        {!isLoading && <PreviewChecks checks={checks} />}
        <Box paddingTop={4}>
          <TextButton
            startIcon={<ArrowRight />}
            onClick={() => setIsSeoChecksVisible((prev) => !prev)}
          >
            {formatMessage({
              id: getTrad('Button.see-details'),
              defaultMessage: 'SEE DETAILS',
            })}
          </TextButton>
        </Box>

        {isBrowserPreviewVisible && (
          <BrowserPreview modifiedData={modifiedData} setIsVisible={setIsBrowserPreviewVisible} />
        )}
        {isSocialPreviewVisible && (
          <SocialPreview modifiedData={modifiedData} setIsVisible={setIsSocialPreviewVisible} />
        )}
        {isSeoChecksVisible && (
          <SeoChecks
            modifiedData={modifiedData}
            components={components}
            contentType={contentType}
            checks={checks}
            setIsVisible={setIsSeoChecksVisible}
          />
        )}
      </Box>
    </SeoCheckerContext.Provider>
  );
};

export default Summary;
