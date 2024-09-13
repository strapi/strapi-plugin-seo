import * as React from 'react';

import { Box, Typography, Accordion, IconButton } from '@strapi/design-system';
import { Heart, EmotionHappy, EmotionUnhappy, Information } from '@strapi/icons';
import { qualityVerdict } from '../../../utils/checks';

// TODO
// padding on bottom when there is no component

const SEOAccordion = ({ title, status, component, label }) => {
  const getIcon = () => {
    switch (status?.qualityVerdict) {
      case qualityVerdict.good:
        // TODO apply colors to accordion icons?
        // return <EmotionHappy aria-hidden={true} fill={`success500`} />;
        return Heart;
      case qualityVerdict.improvements:
        return EmotionHappy;
      case qualityVerdict.bad:
        return EmotionUnhappy;
      default:
        return EmotionHappy;
    }
  };

  return (
    <Accordion.Root>
      <Accordion.Item value="acc-01">
        <Accordion.Header>
          <Accordion.Trigger icon={getIcon()}>{title}</Accordion.Trigger>
          <Accordion.Actions>
            <IconButton label={label}>
              <Information />
            </IconButton>
          </Accordion.Actions>
        </Accordion.Header>
        <Accordion.Content>
          <Box paddingLeft={4} paddingTop={4}>
            <Typography variant="omega">{status?.message}</Typography>
          </Box>
          {component && component}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default SEOAccordion;
