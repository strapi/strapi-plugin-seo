import React from 'react';

import { Box, Typography, EmptyStateLayout, Modal } from '@strapi/design-system';

import { Illo } from '../../../HomePage/Main/EmptyComponentLayout/illo';

import MetaRobotCheck from './MetaRobotCheck';
import WordCountCheck from './WordCountCheck';
import MetaTitleCheck from './MetaTitleCheck';
import MetaSocialCheck from './MetaSocialCheck';
import CanonicalUrlCheck from './CanonicalUrlCheck';
import LastUpdatedAtCheck from './LastUpdatedAtCheck';
import KeywordDensityCheck from './KeywordDensityCheck';
import StructuredDataCheck from './StructuredDataCheck';
import MetaDescriptionCheck from './MetaDescriptionCheck';
import AlternativeTextCheck from './AlternativeTextCheck';

import { getRichTextCheck } from '../../utils';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../utils/getTrad';

const SeoChecks = ({ modifiedData, components, contentType, checks }) => {
  const { formatMessage } = useIntl();

  const { wordCount, keywordsDensity, emptyAltCount } = getRichTextCheck(
    modifiedData,
    components,
    contentType
  );

  const seo = modifiedData?.seo ?? null;
  const hasSeo = seo && Object.keys(seo).length > 0;

  return (
    <Modal.Content labelledBy="title">
      <Modal.Header>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {formatMessage({
            id: getTrad('Button.seo-analyze'),
            defaultMessage: 'SEO Analyze',
          })}
        </Typography>
      </Modal.Header>
      <Modal.Body>
        {hasSeo ? (
          <Box>
            {checks?.metaTitle && (
              <MetaTitleCheck metaTitle={seo?.metaTitle ?? null} checks={checks} />
            )}
            {checks?.metaDescription && (
              <MetaDescriptionCheck
                metaDescription={seo?.metaDescription ?? null}
                checks={checks}
              />
            )}
            {checks?.wordCount && <WordCountCheck wordCount={wordCount} checks={checks} />}
            {checks?.keywordsDensity && (
              <KeywordDensityCheck keywordsDensity={keywordsDensity} checks={checks} />
            )}
            {checks?.metaSocial && (
              <MetaSocialCheck metaSocial={seo?.metaSocial ?? null} checks={checks} />
            )}
            {checks?.canonicalUrl && (
              <CanonicalUrlCheck canonicalUrl={seo?.canonicalURL ?? null} checks={checks} />
            )}
            {checks?.structuredData && (
              <StructuredDataCheck structuredData={seo?.structuredData ?? null} checks={checks} />
            )}
            {checks?.metaRobots && (
              <MetaRobotCheck metaRobots={seo?.metaRobots ?? null} checks={checks} />
            )}
            {checks?.alternativeText && (
              <AlternativeTextCheck
                intersections={emptyAltCount?.intersections ?? null}
                richTextAlts={emptyAltCount?.richTextAlts ?? null}
                altTexts={emptyAltCount?.altTexts ?? null}
                checks={checks}
              />
            )}
            {checks?.lastUpdatedAt && (
              <LastUpdatedAtCheck updatedAt={seo?.updatedAt ?? null} checks={checks} />
            )}
          </Box>
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

export default SeoChecks;
