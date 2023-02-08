import _ from 'lodash';

const recursiveSearch = (
  obj,
  keyword,
  relations,
  results = [],
  allImageNames = []
) => {

  const alternativeTexts = results;
  const imageNames = allImageNames;

  // Iterating on every entry fields starting with modifiedData
  Object.keys(obj).forEach((key) => {
    // Get the value of the field
    const value = obj[key];
    // If the field is an alternativeText
    if (key === keyword && typeof value !== 'object') {
      // It pushes the value in an array and the name in another
      alternativeTexts.push(value);
      imageNames.push(obj['name']);
    } else if (
      typeof value === 'object' &&
      !relations.includes(key) &&
      !_.isNull(value)
    ) {
      recursiveSearch(value, keyword, relations, alternativeTexts, imageNames);
    }
  });
  return { alternativeTexts, imageNames };
};

const getRegularImageAltTexts = (contentType, modifiedData) => {
  // Prevent to recursively search in relations starting with localizations
  let relations = ['localizations'];

  // Get every relations to black list them
  Object.keys(contentType.attributes).map((field) => {
    if (contentType.attributes[field].type === 'relation') {
      relations.push(field);
    }
  });

  const { alternativeTexts, imageNames } = recursiveSearch(
    modifiedData,
    'alternativeText',
    relations
  );

  const alternativeTextCount = alternativeTexts.length;
  const intersections =
    alternativeTexts.filter((x) => imageNames.includes(x)).length - alternativeTextCount;

  return { intersections, altTexts: alternativeTexts };
};

export default getRegularImageAltTexts;
