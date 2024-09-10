import React, { useState } from 'react';
import styled from 'styled-components';

import { Box, Typography, IconButton, Accordion } from '@strapi/design-system';
import { More, Information } from '@strapi/icons';

const SEOAccordion = ({ title, status, component, label }) => {
  const [expanded, setExpanded] = useState(false);

  const CustomAccordionToggle = styled(Accordion.Trigger)`
    z-index: auto;
  `;

  return (
    <Accordion.Root>
      <Accordion.Item expanded={expanded} toggle={() => setExpanded((s) => !s)} id="acc-1" size="S">
        <CustomAccordionToggle
          title={title}
          togglePosition="left"
          startIcon={
            <More
              aria-hidden={true}
              colors={(theme) => ({
                rect: {
                  fill: _.get(theme, `colors.${status?.color}600`),
                },
              })}
            />
          }
          action={<IconButton label={label} icon={<Information />} />}
        />
        <Accordion.Content>
          <Box paddingLeft={4} paddingTop={4}>
            <Typography variant="omega">{status?.message}</Typography>
          </Box>
        </Accordion.Content>

        {component && <Accordion.Content>{component}</Accordion.Content>}
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default SEOAccordion;
