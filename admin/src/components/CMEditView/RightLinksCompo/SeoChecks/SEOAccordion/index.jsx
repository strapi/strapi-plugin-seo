import * as React from 'react';

import { Box, Typography, Accordion, IconButton } from '@strapi/design-system';
import { Information, CrossCircle, CheckCircle, WarningCircle } from '@strapi/icons';
import { qualityVerdict } from '../../../utils/checks';

const SEOAccordion = ({ title, status, component, label }) => {
  const getIcon = () => {
    switch (status?.qualityVerdict) {
      case qualityVerdict.good:
        return CheckCircle;
      case qualityVerdict.improvements:
        return WarningCircle;
      // TODO update the DS to support icons like this
      // <WarningCircle fill="warning600" />
      case qualityVerdict.bad:
        return CrossCircle;
      default:
        return WarningCircle;
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
          <Box paddingTop={4} paddingLeft={4} paddingBottom={4}>
            <Typography variant="omega">{status?.message}</Typography>
          </Box>
          {component && component}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default SEOAccordion;
