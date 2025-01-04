import get from 'lodash/get';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';

export const qualityVerdict = {
  good: 'good',
  improvements: 'improvements',
  bad: 'bad',
};

export const getMetaTitleCheckPreview = (modifiedData) => {
  const metaTitle = get(modifiedData, 'seo.metaTitle');

  let status = {
    message: '',
    qualityVerdict: qualityVerdict.good,
  };

  if (isNull(metaTitle) || isEmpty(metaTitle)) {
    status = {
      message: '',
      qualityVerdict: qualityVerdict.improvements,
    };
  } else if (metaTitle.length > 60) {
    status = {
      message: '',
      qualityVerdict: qualityVerdict.bad,
    };
  }
  return status;
};

export const getMetaDescriptionPreview = (modifiedData) => {
  const metaDescription = get(modifiedData, 'seo.metaDescription');

  let status = {
    message: '',
    qualityVerdict: qualityVerdict.good,
  };

  if (isNull(metaDescription) || isEmpty(metaDescription)) {
    status = {
      message: '',
      qualityVerdict: qualityVerdict.improvements,
    };
  } else if (metaDescription.length > 160) {
    status = {
      message: '',
      qualityVerdict: qualityVerdict.bad,
    };
  } else if (metaDescription.length < 50) {
    status = {
      message: '',
      qualityVerdict: qualityVerdict.bad,
    };
  }
  return status;
};

export const getAlternativeTextPreview = (emptyAltCount) => {
  const intersections = get(emptyAltCount, 'intersections', null);
  const richTextAlts = get(emptyAltCount, 'richTextAlts', null);
  const altTexts = get(emptyAltCount, 'altTexts', null);

  let status = {
    message: '',
    qualityVerdict: qualityVerdict.good,
  };

  const missingRichTextAlt = richTextAlts.filter((x) => x.occurences != 0).length;
  if (intersections === 0) {
    status = {
      message: '',
      qualityVerdict: qualityVerdict.bad,
    };
  } else if (altTexts.includes('')) {
    status = {
      message: '',
      qualityVerdict: qualityVerdict.improvements,
    };
  } else if (missingRichTextAlt >= 1) {
    status = {
      message: '',
      qualityVerdict: qualityVerdict.improvements,
    };
  }
  return status;
};

export const getWordCountPreview = (wordCount) => {
  let status = {
    message: '',
    qualityVerdict: qualityVerdict.good,
  };

  if (isNull(wordCount)) {
    status = {
      message: '',
      qualityVerdict: qualityVerdict.improvements,
    };
    return;
  } else if (wordCount < 300) {
    status = {
      message: '',
      qualityVerdict: qualityVerdict.improvements,
    };
  }
  return status;
};

export const getKeywordDensityPreview = (keywordsDensity) => {
  let status = {
    message: '',
    qualityVerdict: qualityVerdict.good,
  };

  if (isEmpty(keywordsDensity)) {
    status = {
      message: '',
      qualityVerdict: qualityVerdict.improvements,
    };
    return status;
  }

  Object.keys(keywordsDensity).map((keyword) => {
    if (get(keywordsDensity[keyword], 'count', 0) === 0) {
      status = {
        message: '',
        qualityVerdict: qualityVerdict.improvements,
      };
    } else if (get(keywordsDensity[keyword], 'count', 0) <= 1) {
      status = {
        message: '',
        qualityVerdict: qualityVerdict.bad,
      };
    }
  });

  return status;
};

export const canonicalUrlPreview = (modifiedData) => {
  const canonicalUrl = get(modifiedData, 'seo.canonicalURL');
  let status = {
    message: '',
    qualityVerdict: qualityVerdict.good,
  };
  if (isNull(canonicalUrl)) {
    status = {
      message: '',
      qualityVerdict: qualityVerdict.bad,
    };
  }
  return status;
};

export const lastUpdatedAtPreview = (modifiedData) => {
  const updatedAt = get(modifiedData, 'updatedAt');

  let status = {
    message: '',
    qualityVerdict: qualityVerdict.improvements,
  };

  if (isNull(updatedAt)) {
    status = {
      message: '',
      qualityVerdict: qualityVerdict.bad,
    };
  } else {
    const oneYearAgo = Date.parse(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
    if (Date.parse(updatedAt) >= oneYearAgo) {
      status = {
        message: '',
        qualityVerdict: qualityVerdict.good,
      };
    }
  }
  return status;
};

export const metaRobotPreview = (modifiedData) => {
  const metaRobots = get(modifiedData, 'seo.metaRobots');
  let status = {
    message: '',
    qualityVerdict: qualityVerdict.good,
  };
  if (isNull(metaRobots) || isEmpty(metaRobots)) {
    status = {
      message: '',
      qualityVerdict: qualityVerdict.good,
    };
  }
  return status;
};

export const openGraphPreview = (modifiedData) => {
  const openGraph = get(modifiedData, 'seo.openGraph');

  let status = {
    message: '',
    qualityVerdict: qualityVerdict.good,
  };

  if (isNull(openGraph) || openGraph === undefined) {
    status = {
      message: '',
      qualityVerdict: qualityVerdict.bad,
    };
    return status;
  } else if (!openGraph['ogTitle'] || !openGraph['ogDescription'] || !openGraph['ogImage']) {
    status = {
      message: '',
      qualityVerdict: qualityVerdict.improvements,
    };
  }
  return status;
};

export const structuredDataPreview = (modifiedData) => {
  const structuredData = get(modifiedData, 'seo.structuredData');
  let status = {
    message: '',
    qualityVerdict: qualityVerdict.good,
  };
  if (isEmpty(structuredData)) {
    status = {
      message: '',
      qualityVerdict: qualityVerdict.bad,
    };
  }
  return status;
};
