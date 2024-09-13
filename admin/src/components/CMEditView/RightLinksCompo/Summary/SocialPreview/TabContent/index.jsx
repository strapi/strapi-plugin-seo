import * as React from 'react';
import { useIntl } from 'react-intl';

import { Box, Flex, Typography, Divider } from '@strapi/design-system';

import { getTrad } from '../../../../../../utils/getTrad';
import MetaChecks from '../../BrowserPreview/MetaChecks';
import KeywordCheck from '../../BrowserPreview/KeywordCheck';

const TabContent = ({ item, keywords, defaultMetaImage }) => {
  const { formatMessage } = useIntl();
  const imageToUse = item?.image ?? defaultMetaImage;

  return (
    <Flex alignItems="center" justifyContent="center" direction="column" spacing={2}>
      <Box padding={4} background="neutral100" shadow="tableShadow" hasRadius>
        {item && (
          <React.Fragment>
            {imageToUse?.url && (
              <Box marginBottom={4}>
                <img src={item.image.url} alt="" style={{ maxWidth: '100%', maxHeight: '300px' }} />
              </Box>
            )}
            <Flex direction="column" alignItems="flex-start">
              <Typography variant="pi" textColor="neutral600">
                {formatMessage({
                  id: getTrad('SEOSocialPreview.website-url'),
                  defaultMessage: 'url-of-your-website',
                })}
              </Typography>
              <Typography variant="omega" fontWeight="bold">
                {item.title && item.title.length > 60
                  ? `${item.title.substring(0, 57)}...`
                  : item.title}
              </Typography>
              <Typography variant="pi">
                {item.description && item.description.length > 65
                  ? `${item.description.substring(0, 62)}...`
                  : item.description}
              </Typography>
            </Flex>
          </React.Fragment>
        )}
        <Divider marginBottom={4} marginTop={4} />
        <MetaChecks item={item.title} max={60} label="title" />
        <MetaChecks
          item={item.description}
          max={item.socialNetwork === 'Facebook' ? 65 : 125}
          label="description"
        />
        {keywords && (
          <React.Fragment>
            {item.title && <KeywordCheck item={item.title} keywords={keywords} label="title" />}

            {item.description && (
              <KeywordCheck item={item.description} keywords={keywords} label="description" />
            )}
          </React.Fragment>
        )}
      </Box>
    </Flex>
  );
};

export default TabContent;
