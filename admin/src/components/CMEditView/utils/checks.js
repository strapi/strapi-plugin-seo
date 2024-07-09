import _ from 'lodash';

const settingsAPI = require('../../../api/settings').default;

import { getRichTextCheck } from '../utils';

const getMetaTitleCheckPreview = (seo) => {
  const metaTitle = _.get(seo, 'metaTitle');

  let status = {
    message: '',
    color: 'success',
  };

  if (_.isNull(metaTitle) || _.isEmpty(metaTitle)) {
    status = {
      message: '',
      color: 'danger',
    };
  } else if (metaTitle.length > 60) {
    status = {
      message: '',
      color: 'warning',
    };
  }
  return status;
};

const getMetaDescriptionPreview = (seo) => {
  const metaDescription = _.get(seo, 'metaDescription');

  let status = {
    message: '',
    color: 'success',
  };

  if (_.isNull(metaDescription) || _.isEmpty(metaDescription)) {
    status = {
      message: '',
      color: 'danger',
    };
  } else if (metaDescription.length > 160) {
    status = {
      message: '',
      color: 'warning',
    };
  } else if (metaDescription.length < 50) {
    status = {
      message: '',
      color: 'warning',
    };
  }
  return status;
};

const getAlternativeTextPreview = (emptyAltCount) => {
  const intersections = _.get(emptyAltCount, 'intersections', null);
  const richTextAlts = _.get(emptyAltCount, 'richTextAlts', null);
  const altTexts = _.get(emptyAltCount, 'altTexts', null);

  let status = {
    message: '',
    color: 'success',
  };

  const missingRichTextAlt = richTextAlts.filter(
    (x) => x.occurences != 0
  ).length;
  if (intersections === 0) {
    status = {
      message: '',
      color: 'warning',
    };
  } else if (altTexts.includes('')) {
    status = {
      message: '',
      color: 'danger',
    };
  } else if (missingRichTextAlt >= 1) {
    status = {
      message: '',
      color: 'danger',
    };
  }
  return status;
};

const getWordCountPreview = (wordCount) => {
  let status = {
    message: '',
    color: 'success',
  };

  if (_.isNull(wordCount)) {
    status = {
      message: '',
      color: 'danger',
    };
    return;
  } else if (wordCount < 300) {
    status = {
      message: '',
      color: 'danger',
    };
  }
  return status;
};

const getKeywordDensityPreview = (keywordsDensity) => {
  let status = {
    message: '',
    color: 'success',
  };

  if (_.isEmpty(keywordsDensity)) {
    status = {
      message: '',
      color: 'danger',
    };
    return status;
  }
  Object.keys(keywordsDensity).map((keyword) => {
    if (_.get(keywordsDensity[keyword], 'count', 0) === 0) {
      status = {
        message: '',
        color: 'danger',
      };
    } else if (_.get(keywordsDensity[keyword], 'count', 0) <= 1) {
      status = {
        message: '',
        color: 'warning',
      };
    }
  });
  return status;
};

const canonicalUrlPreview = (seo) => {
  const canonicalUrl = _.get(seo, 'canonicalURL');
  let status = {
    message: '',
    color: 'success',
  };
  if (_.isNull(canonicalUrl)) {
    status = {
      message: '',
      color: 'warning',
    };
  }
  return status;
};

const lastUpdatedAtPreview = (modifiedData) => {
  const updatedAt = _.get(modifiedData, 'updatedAt');

  let status = {
    message: '',
    color: 'danger',
  };

  if (_.isNull(updatedAt)) {
    status = {
      message: '',
      color: 'warning',
    };
  } else {
    const oneYearAgo = Date.parse(
      new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    );
    if (Date.parse(updatedAt) >= oneYearAgo) {
      status = {
        message: '',
        color: 'success',
      };
    }
  }
  return status;
};

const metaRobotPreview = (seo) => {
  const metaRobots = _.get(seo, 'metaRobots');
  let status = {
    message: '',
    color: 'success',
  };
  if (_.isNull(metaRobots) || _.isEmpty(metaRobots)) {
    status = {
      message: '',
      color: 'success',
    };
  }
  return status;
};

const metaSocialPreview = (seo) => {
  const metaSocial = _.get(seo, 'metaSocial');

  let status = {
    message: '',
    color: '',
  };

  if (_.isNull(metaSocial) || metaSocial === undefined) {
    status = {
      message: '',
      color: 'danger',
    };
    return status;
  }
  const count = metaSocial.filter((meta) => !_.isNull(meta.id)).length;
  if (count === 0) {
    status = {
      message: '',
      color: 'danger',
    };
  } else if (count == 1) {
    status = {
      message: '',
      color: 'warning',
    };
  } else {
    status = {
      message: '',
      color: 'success',
    };
  }
  return status;
};

const structuredDataPreview = (seo) => {
  const structuredData = _.get(seo, 'structuredData');
  let status = {
    message: '',
    color: 'success',
  };
  if (_.isEmpty(structuredData)) {
    status = {
      message: '',
      color: 'warning',
    };
  }
  return status;
};

const getAllChecks = async (layout, modifiedData, components, contentType) => {
  const defaultSettings = await settingsAPI.get();

  const seoPropName = Object.entries(layout.attributes).find(([, attr]) => attr.type === "component" && attr.component === 'shared.seo')[0];
  const seo = _.get(modifiedData, seoPropName, null);

  const { wordCount, keywordsDensity, emptyAltCount } = getRichTextCheck(
    seo,
    modifiedData,
    components,
    contentType
  );

  let result = {
    ...(defaultSettings[layout?.uid]?.seoChecks?.metaTitle && {
      metaTitle: getMetaTitleCheckPreview(seo),
    }),
    ...(defaultSettings[layout?.uid]?.seoChecks?.wordCount && {
      wordCount: getWordCountPreview(wordCount),
    }),
    ...(defaultSettings[layout?.uid]?.seoChecks?.metaRobots && {
      metaRobots: metaRobotPreview(seo),
    }),
    ...(defaultSettings[layout?.uid]?.seoChecks?.metaSocial && {
      metaSocial: metaSocialPreview(seo),
    }),
    ...(defaultSettings[layout?.uid]?.seoChecks?.canonicalUrl && {
      canonicalUrl: canonicalUrlPreview(seo),
    }),
    ...(defaultSettings[layout?.uid]?.seoChecks?.lastUpdatedAt && {
      lastUpdatedAt: lastUpdatedAtPreview(modifiedData),
    }),
    ...(defaultSettings[layout?.uid]?.seoChecks?.structuredData && {
      structuredData: structuredDataPreview(seo),
    }),
    ...(defaultSettings[layout?.uid]?.seoChecks?.metaDescription && {
      metaDescription: getMetaDescriptionPreview(seo),
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

export { getMetaTitleCheckPreview, getAllChecks };
