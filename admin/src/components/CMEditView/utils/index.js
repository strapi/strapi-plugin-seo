import _ from 'lodash';

import getRichTextFields from './getRichTextFields';
import getRegularImageAltTexts from './getRegularImageAltTexts';

const showdown = require('showdown');
const converter = new showdown.Converter();

let keywordsDensity = {};

const getEmptyAltCount = (richtext, field) => {
  if (richtext) {
    let htmlOccurences = 0;
    const splittedRichtext = richtext.split('\n');
    const occurences = splittedRichtext.filter((x) =>
      x.includes('![](')
    ).length;

    const images = richtext.match(/<img[^>]*\/?>/g);
    if (images) {
      htmlOccurences += images.filter(
        (image) => !image.includes('alt=')
      ).length;
    }
    return { field, occurences: occurences + htmlOccurences };
  }
  return { field, occurences: 0 };
};

const increaseCounter = (base, field) => {
  const richtext = _.get(base, field, '');
  // Get empty HTML and Markdown empty alternativeText
  const emptyAlts = getEmptyAltCount(richtext, field);
  if (richtext) {
    const html = converter.makeHtml(richtext);
    const wordsNotCleaned = html
      .replace(/<\/?[^>]+(>|$)/g, '')
      .replace('\n', ' ')
      .toLowerCase()
      .split(' ');
    const words = wordsNotCleaned.filter((x) => {
      return x !== '' && x !== '\n';
    });
    return { words, length: words.length, emptyAlts };
  } else {
    return { words: [], length: 0, emptyAlts };
  }
};

const buildKeywordDensityObject = (keywords, words) => {
  keywords.map((keyword) => {
    if (!_.isEmpty(keyword)) {
      const trimmedKeyword = keyword.trim();
      const exp = new RegExp(
        trimmedKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        'g'
      );
      const count = (words.join(' ').match(exp) || []).length;
      if (keywordsDensity[trimmedKeyword] === undefined) {
        keywordsDensity[trimmedKeyword] = { count };
      } else {
        keywordsDensity[trimmedKeyword].count += count;
      }
    }
  });
};

const getRichTextCheck = (modifiedData, components, contentType) => {
  const richTextFields = getRichTextFields(
    contentType,
    components,
    modifiedData
  );

  const { intersections, altTexts } = getRegularImageAltTexts(
    contentType,
    modifiedData
  );

  let emptyAltCount = { intersections, richTextAlts: [], altTexts };

  let wordCount = 0;
  let keywords = [];

  // Keywords
  const tmp = _.get(modifiedData, 'seo.keywords', null);
  if (tmp) keywords = tmp.toLowerCase().split(',');
  keywordsDensity = {};

  // Iterate on every richtext fields we have
  richTextFields.map((data) => {
    // 1st level field
    if (_.isNull(data.field)) {
      const { words, length, emptyAlts } = increaseCounter(
        modifiedData,
        data.name
      );

      wordCount += length;
      emptyAltCount.richTextAlts.push(emptyAlts);
      buildKeywordDensityObject(keywords, words);
    }
    // Repeatable and non-repeatable component that contains richtext
    else if (!data.inDz) {
      const item = _.get(modifiedData, _.last(data.name.split('.')), '');
      if (item) {
        const isRepeatable = _.isArray(item);

        if (isRepeatable) {
          item.map((x) => {
            const { words, length, emptyAlts } = increaseCounter(x, data.field);
            wordCount += length;
            emptyAltCount.richTextAlts.push(emptyAlts);
            buildKeywordDensityObject(keywords, words);
          });
        } else {
          const { words, length, emptyAlts } = increaseCounter(
            item,
            data.field
          );
          wordCount += length;
          emptyAltCount.richTextAlts.push(emptyAlts);
          buildKeywordDensityObject(keywords, words);
        }
      }
    }
    // Dynamic zone
    else {
      const components = _.get(modifiedData, data.inDz, []);
      if (!_.isEmpty(components)) {
        const richTextComponents = components.filter(
          (x) => x.__component === data.name
        );

        richTextComponents.map((component) => {
          const item = _.get(component, data.field, []);
          const isRepeatable = _.isArray(item);

          if (isRepeatable) {
            const repeatableField = _.get(
              component,
              _.last(data.name.split('.')),
              []
            );
            repeatableField.map((x) => {
              const { words, length, emptyAlts } = increaseCounter(
                x,
                data.field
              );
              wordCount += length;
              emptyAltCount.richTextAlts.push(emptyAlts);
              buildKeywordDensityObject(keywords, words);
            });
          } else {
            const { words, length, emptyAlts } = increaseCounter(
              component,
              data.field
            );
            wordCount += length;
            emptyAltCount.richTextAlts.push(emptyAlts);
            buildKeywordDensityObject(keywords, words);
          }
        });
      }
    }
  });

  return {
    wordCount,
    keywordsDensity,
    emptyAltCount: emptyAltCount,
  };
};

export { getRichTextCheck };
