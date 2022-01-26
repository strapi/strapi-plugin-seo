import React from 'react';

import { getRichTextCheck } from '../../utils';

import { Box } from '@strapi/design-system/Box';

import KeywordDensityCheck from './KeywordDensityCheck';
import WordCountCheck from './WordCountCheck';
import MetaSocialCheck from './MetaSocialCheck';
import MetaTitleCheck from './MetaTitleCheck';
import MetaDescriptionCheck from './MetaDescriptionCheck';
import CanonicalUrlCheck from './CanonicalUrlCheck';
import StructuredDataCheck from './StructuredDataCheck';
import LastUpdatedAtCheck from './LastUpdatedAtCheck';
import MetaRobotCheck from './MetaRobotCheck';
import AlternativeTextCheck from './AlternativeTextCheck';

import _ from 'lodash';

const SEOChecker = ({ modifiedData, components, contentType }) => {
  const { wordCount, keywordsDensity, emptyAltCount } = getRichTextCheck(
    modifiedData,
    components,
    contentType
  );

  return (
    <Box padding={4}>
      <MetaTitleCheck metaTitle={_.get(modifiedData, 'seo.metaTitle', null)} />
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
