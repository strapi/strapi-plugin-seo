import React from 'react';

import { getRichTextCheck } from '../../utils';

import { Box } from '@strapi/design-system/Box';

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

import _ from 'lodash';

const SEOChecker = ({ modifiedData, components, contentType, checks }) => {
  const { wordCount, keywordsDensity, emptyAltCount } = getRichTextCheck(
    modifiedData,
    components,
    contentType
  );

  return (
    <Box padding={4}>
      <MetaTitleCheck metaTitle={_.get(modifiedData, 'seo.metaTitle', null)} checks={checks} />
      <MetaDescriptionCheck
        metaDescription={_.get(modifiedData, 'seo.metaDescription', null)}
      />
      <WordCountCheck wordCount={wordCount} />
      <KeywordDensityCheck keywordsDensity={keywordsDensity} />
      <MetaSocialCheck
        metaSocial={_.get(modifiedData, 'seo.metaSocial', null)}
      />
      <CanonicalUrlCheck
        canonicalUrl={_.get(modifiedData, 'seo.canonicalURL', null)}
      />
      <StructuredDataCheck
        structuredData={_.get(modifiedData, 'seo.structuredData', null)}
      />
      <MetaRobotCheck
        metaRobots={_.get(modifiedData, 'seo.metaRobots', null)}
      />
      <AlternativeTextCheck
        intersections={_.get(emptyAltCount, 'intersections', null)}
        richTextAlts={_.get(emptyAltCount, 'richTextAlts', null)}
        altTexts={_.get(emptyAltCount, 'altTexts', null)}
      />
      <LastUpdatedAtCheck updatedAt={_.get(modifiedData, 'updatedAt', null)} />
    </Box>
  );
};

export default SEOChecker;
