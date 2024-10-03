import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import isArray from 'lodash/isArray';
import showdown from 'showdown';

import { getRichTextFields } from './getRichTextFields';
import { getRegularImageAltTexts } from './getRegularImageAltTexts';

const converter = new showdown.Converter();

let keywordsDensity = {};

const getEmptyAltCount = (richtext, field) => {
  if (richtext) {
    let htmlOccurences = 0;
    const splitRichText = richtext.split('\n');
    const occurences = splitRichText.filter((entry) => entry.includes('![](')).length;

    const images = richtext.match(/<img[^>]*\/?>/g);
    if (images) {
      htmlOccurences += images.filter((image) => !image.includes('alt=')).length;
    }

    return { field, occurences: occurences + htmlOccurences };
  }

  return { field, occurences: 0 };
};

const increaseCounter = (base, field) => {
  const richtext = base?.field ?? '';

  // Get empty HTML and Markdown empty alternativeText
  const emptyAlts = getEmptyAltCount(richtext, field);
  if (richtext) {
    const html = converter.makeHtml(richtext);
    const wordsNotCleaned = html
      .replace(/<\/?[^>]+(>|$)/g, '')
      .replace('\n', ' ')
      .toLowerCase()
      .split(' ');

    const words = wordsNotCleaned.filter((entry) => {
      return entry !== '' && entry !== '\n';
    });

    return { words, length: words.length, emptyAlts };
  } else {
    return { words: [], length: 0, emptyAlts };
  }
};

const buildKeywordDensityObject = (keywords, words) => {
  keywords.map((keyword) => {
    if (!isEmpty(keyword)) {
      const trimmedKeyword = keyword.trim();
      const exp = new RegExp(trimmedKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
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
  const richTextFields = getRichTextFields(contentType, components, modifiedData);

  const { intersections, altTexts } = getRegularImageAltTexts(contentType, modifiedData);

  let emptyAltCount = { intersections, richTextAlts: [], altTexts };

  let wordCount = 0;
  let keywords = [];

  // Keywords
  const tmp = modifiedData?.seo?.keywords ?? null;
  if (tmp) keywords = tmp.toLowerCase().split(',');
  keywordsDensity = {};

  // Iterate on every richtext fields we have
  richTextFields.map((data) => {
    // 1st level field
    if (isNull(data.field)) {
      const { words, length, emptyAlts } = increaseCounter(modifiedData, data.name);

      wordCount += length;
      emptyAltCount.richTextAlts.push(emptyAlts);
      buildKeywordDensityObject(keywords, words);
    }
    // Repeatable and non-repeatable component that contains richtext
    else if (!data.inDz) {
      const item = get(modifiedData, data.name.split('.').pop(), '');
      if (item) {
        const isRepeatable = isArray(item);

        if (isRepeatable) {
          item.map((x) => {
            const { words, length, emptyAlts } = increaseCounter(x, data.field);
            wordCount += length;
            emptyAltCount.richTextAlts.push(emptyAlts);
            buildKeywordDensityObject(keywords, words);
          });
        } else {
          const { words, length, emptyAlts } = increaseCounter(item, data.field);
          wordCount += length;
          emptyAltCount.richTextAlts.push(emptyAlts);
          buildKeywordDensityObject(keywords, words);
        }
      }
    }
    // Dynamic zone
    else {
      const components = get(modifiedData, data.inDz, []);
      if (!isEmpty(components)) {
        const richTextComponents = components.filter((x) => x.__component === data.name);

        richTextComponents.map((component) => {
          const item = get(component, data.field, []);
          const isRepeatable = isArray(item);

          if (isRepeatable) {
            const repeatableField = get(component, data.name.split('.').pop(), []);
            repeatableField.map((x) => {
              const { words, length, emptyAlts } = increaseCounter(x, data.field);
              wordCount += length;
              emptyAltCount.richTextAlts.push(emptyAlts);
              buildKeywordDensityObject(keywords, words);
            });
          } else {
            const { words, length, emptyAlts } = increaseCounter(component, data.field);
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
