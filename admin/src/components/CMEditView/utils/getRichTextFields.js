import _ from 'lodash';

// Get every 1st level richtext fields
const getRichTextFields = (contentType, components, modifiedData) => {
  let dynamicZones = [];
  let richTextFields = [];

  // Get every Dynamic Zones from the actual content-type
  Object.values(modifiedData).map((field, index) => {
    if (_.isArray(field)) {
      const isComponent = field.find((subFields) =>
        Object.keys(subFields).includes('__component')
      );

      if (isComponent) dynamicZones.push(Object.keys(modifiedData)[index]);
    }
  });

  // Get every 1st level richtext fields
  Object.keys(contentType.attributes).map((field) => {
    if (contentType.attributes[field].type === 'richtext') {
      richTextFields.push({ name: field, field: null });
    }
  });

  // Get every 1st level richtext fields in the CT component
  Object.keys(components).map((name) => {
    Object.keys(components[name].attributes).map((field) => {
      if (components[name].attributes[field].type === 'richtext') {
        richTextFields.push({ name, field });
      }
    });
  });

  // Replace every component names by the parent DZ name if exists
  // Necessary when having DZ => Component => richtext
  richTextFields.map((item, index) => {
    const exploded = item.name.split('.');
    const last = _.last(exploded);
    const tmp = _.get(modifiedData, last, null);
    if (!tmp) {
      Object.keys(components).map((name) => {
        if (components[name].isComponent) {
          Object.keys(components[name].attributes).map((field) => {
            if (
              components[name].attributes[field].component &&
              components[name].attributes[field].component === item.name
            ) {
              const associatedDZ = dynamicZones.find(
                (dz) => dz === name.split('.')[0]
              );
              const newObject = { name, field: item.field, inDz: associatedDZ };
              richTextFields[index] = newObject;
            }
          });
        }
      });
    }
  });

  // Remove components that are not in the CT
  dynamicZones.map((dz) => {
    const item = _.get(modifiedData, dz, []);
    richTextFields.map((field, index) => {
      const compoIsInModifiedData = item.find(
        (x) => x.__component === field.name
      );

      // If component is in the DZ but doesn't have an associated DZ, we add it to the object
      if (!_.isEmpty(compoIsInModifiedData) && !field.inDz) {
        richTextFields[index] = { ...field, inDz: dz };
      }

      // If the component is not included in the DZ, we remove the object
      if (_.isEmpty(compoIsInModifiedData) && field.inDz) {
        _.pull(richTextFields, field);
      }
    });
  });

  return richTextFields;
};

export default getRichTextFields;
