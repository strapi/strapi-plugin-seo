import React from 'react';

import { Box } from '@strapi/design-system/Box';

import { useCMEditViewDataManager } from '@strapi/helper-plugin';

import Summary from './Summary';

import _ from 'lodash';

const SeoChecker = () => {
  const { modifiedData } = useCMEditViewDataManager();

  let viewSEO = false;

for (let key in modifiedData) {
  //console.log(modifiedData[key] instanceof Object)
  if(modifiedData[key] instanceof Array){
    modifiedData[key].forEach(data =>{
      data.hasOwnProperty("metaTitle") ? viewSEO = true : ""
      //data.hasOwnProperty("__component") && data.__component=="shared.seo"
    })
  }
  else if(modifiedData[key] instanceof Object){
    modifiedData[key].hasOwnProperty("metaTitle") ? viewSEO = true : ""
  };
  console.log(viewSEO)
 }
if (viewSEO) {
  return (
    <Box
      as="aside"
      aria-labelledby="additional-informations"
      background="neutral0"
      borderColor="neutral150"
      hasRadius
      paddingBottom={4}
      paddingLeft={4}
      paddingRight={4}
      paddingTop={6}
      shadow="tableShadow"
    >
      <Summary />
    </Box>
  );
}
return <></>;
};
export default SeoChecker;
