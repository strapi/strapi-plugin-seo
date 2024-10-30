import isNull from 'lodash/isNull';

/**
 * Recursively searches through an object to find specific keyword matches and collect relevant data.
 * @param {Object} obj - The object to search through.
 * @param {string} keyword - The keyword to search for (e.g., 'alternativeText').
 * @param {Array} relations - Fields to exclude from the recursive search (e.g., relations).
 * @param {Array} results - Accumulator for matching keyword values (default: empty array).
 * @param {Array} allImageNames - Accumulator for associated image names (default: empty array).
 * @returns {Object} - An object containing arrays of alternativeTexts and imageNames.
 */
const recursiveSearch = (obj, keyword, relations, results = [], allImageNames = []) => {
  // Arrays to store found alternativeTexts and imageNames
  const alternativeTexts = results;
  const imageNames = allImageNames;

  // Iterate through the object keys
  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    // Check if the key matches the keyword and its value is not an object
    if (key === keyword && typeof value !== 'object') {
      alternativeTexts.push(value); // Store the alternative text
      imageNames.push(obj['name']); // Store the associated image name
    }
    // Recursively search in nested objects, ignoring relations and null values
    else if (typeof value === 'object' && !relations.includes(key) && !isNull(value)) {
      recursiveSearch(value, keyword, relations, alternativeTexts, imageNames);
    }
  });

  // Return the collected alternative texts and image names
  return { alternativeTexts, imageNames };
};

/**
 * Extracts alternative texts and image names from the content, excluding relations.
 * @param {Object} contentType - The content type structure to determine relations.
 * @param {Object} modifiedData - The actual content data to search through.
 * @returns {Object} - Contains the count of alternative texts and intersections.
 */
export const getRegularImageAltTexts = (contentType, modifiedData) => {
  // Relations to exclude from the recursive search (default: localizations)
  const relations = ['localizations'];

  // Identify relation fields from the contentType and add them to the exclusion list
  Object.keys(contentType.attributes).forEach((field) => {
    if (contentType.attributes[field].type === 'relation') {
      relations.push(field);
    }
  });

  // Perform the recursive search to find alternative texts and image names
  const { alternativeTexts, imageNames } = recursiveSearch(
    modifiedData,
    'alternativeText',
    relations
  );

  // Count the number of alternative texts found
  const alternativeTextCount = alternativeTexts.length;

  // Calculate intersections (images whose names appear in the alternative texts)
  const intersections =
    alternativeTexts.filter((altText) => imageNames.includes(altText)).length -
    alternativeTextCount;

  // Return the intersection count and the collected alternative texts
  return { intersections, altTexts: alternativeTexts };
};
