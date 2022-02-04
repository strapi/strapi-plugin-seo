import React, { useEffect, useState, useReducer, createContext } from 'react';

import _ from 'lodash';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@strapi/design-system/ModalLayout';

import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { Divider } from '@strapi/design-system/Divider';
import { Typography } from '@strapi/design-system/Typography';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';

import SeoTabs from '../../Tabs';
import PreviewChecks from './PreviewChecks';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../utils';

import Search from '@strapi/icons/Search';
import { Illo } from '../../../SeoPage/Info/EmptyComponentLayout/illo';

import { getAllChecks } from '../../utils/checks';

const initialState = {
  metaTile: { message: '', color: '' },
  metaDescription: { message: '', color: '' },
  preview: true,
};
function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_METATITLE':
      return {
        ...state,
        metaTitle: {
          color: action.value.color,
          message: action.value.message,
        },
      };
    case 'UPDATE_METADESCRIPTION':
      return {
        ...state,
        metaDescription: {
          color: action.value.color,
          message: action.value.message,
        },
      };
    case 'UPDATE_METASOCIAL':
      return {
        ...state,
        metaSocial: {
          color: action.value.color,
          message: action.value.message,
        },
      };
    case 'UPDATE_METAROBOT':
      return {
        ...state,
        metaRobot: {
          color: action.value.color,
          message: action.value.message,
        },
      };
    case 'UPDATE_CANONICAL':
      return {
        ...state,
        canonicalUrl: {
          color: action.value.color,
          message: action.value.message,
        },
      };
    case 'UPDATE_WORDCOUNT':
      return {
        ...state,
        wordCount: {
          color: action.value.color,
          message: action.value.message,
        },
      };
    case 'UPDATE_LAST_UPDATED_AT':
      return {
        ...state,
        lastUpdatedAt: {
          color: action.value.color,
          message: action.value.message,
        },
      };
    case 'UPDATE_STRUCTURED_DATA':
      return {
        ...state,
        structuredData: {
          color: action.value.color,
          message: action.value.message,
        },
      };
    case 'UPDATE_ALTERNATIVE_TEXT':
      return {
        ...state,
        alternativeText: {
          color: action.value.color,
          message: action.value.message,
        },
      };
    case 'UPDATE_KEYWORD_DENSITY':
      return {
        ...state,
        keywordDensity: {
          color: action.value.color,
          message: action.value.message,
        },
      };
    case 'UPDATE_FOR_PREVIEW':
      return action.value;
    default:
      throw new Error();
  }
}

export const SeoCheckerContext = createContext(null);

const Summary = () => {
  const { formatMessage } = useIntl();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [localChecks, setLocalChecks] = useState({});
  const [checks, dispatch] = useReducer(reducer, initialState);
  const { allLayoutData, modifiedData } = useCMEditViewDataManager();

  const { contentType, components } = allLayoutData;

  useEffect(() => {
    if (!_.isEqual(localChecks, checks)) {
      if (_.has(checks, 'preview')) {
        const status = getAllChecks(modifiedData, components, contentType);
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
    setIsLoading(false);
  }, [checks]);

  return (
    <SeoCheckerContext.Provider value={dispatch}>
      <Box>
        <Typography variant="sigma" textColor="neutral600" id="seo">
          SEO Plugin
        </Typography>
        <Box paddingTop={2} paddingBottom={6}>
          <Divider />
        </Box>
        <Button
          fullWidth
          variant="secondary"
          startIcon={<Search />}
          onClick={() => setIsVisible((prev) => !prev)}
        >
          Preview
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
                SEO Plugin
              </Typography>
            </ModalHeader>
            <ModalBody>
              {_.get(modifiedData, 'seo', null) ? (
                <SeoTabs
                  modifiedData={modifiedData}
                  components={components}
                  contentType={contentType}
                  checks={checks}
                />
              ) : (
                <EmptyStateLayout
                  icon={<Illo />}
                  content={formatMessage({
                    id: getTrad('Modal.seo-component-empy'),
                    defaultMessage: 'Your SEO component is empty...',
                  })}
                />
              )}
            </ModalBody>
            <ModalFooter
              startActions={
                <Button
                  onClick={() => setIsVisible((prev) => !prev)}
                  variant="tertiary"
                >
                  {formatMessage({
                    id: getTrad('Modal.cancel'),
                    defaultMessage: 'Cancel',
                  })}
                </Button>
              }
            />
          </ModalLayout>
        )}
        {!isLoading && <PreviewChecks checks={checks} />}
      </Box>
    </SeoCheckerContext.Provider>
  );
};

export default Summary;
